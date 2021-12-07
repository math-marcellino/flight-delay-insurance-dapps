//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightDelayInsurance{
    address payable owner;
    uint public lockedBalance; 
    
    receive() external payable{}
    fallback() external payable{}
    
    constructor(){
        owner = payable(msg.sender);
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can access this function");
        _;
    }

    modifier onlyRegisteredAirline(){
        require(bytes(airlineName[msg.sender]).length != 0, "Only a registered airline can access this function!");
        _;
    }

    modifier flightExist(string memory _flightID){
        require(flightID[_flightID].exist == true, "The flight does not exist!");
        _;
    }
    
    modifier flightFinished(string memory _flightID){
        if(block.timestamp > flightID[_flightID].arriveTime){
            flightID[_flightID].finished = true;
        }
        require(flightID[_flightID].finished == true, "The flight is not finished yet!");
        _;
    }
    
    mapping(address => string) airlineName;
    
    enum Delayed{None, LateArrival, MechanicalIssue, Weather, Canceled}
    
    struct flightData{
        string airline;
        uint departTime;
        uint arriveTime;
        uint delayDuration;
        Delayed delayReason;
        bool finished;
        history[] orders;
        bool exist;
    }
    
    struct history{
        address customer;
        uint premiumPaid; 
        uint orderedAt; 
    }
    
    mapping(string => flightData) flightID;
    
    function depositEther() public onlyOwner payable{
        payable(address(this)).transfer(msg.value);
    }

    function withdrawEther(uint _weiAmount) public onlyOwner payable{
        uint availableBalance = address(this).balance - lockedBalance;
        require(availableBalance >= _weiAmount, "Not enough available ether to be withdrawn!");
        owner.transfer(_weiAmount);
    }
    
    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function registerAirline(address _airlineAddr, string memory _name) public onlyOwner{
        airlineName[_airlineAddr] = _name;
    }

    function registerFlight(string memory _flightID, uint _departTime, uint _arriveTime) public onlyRegisteredAirline{
        require(_arriveTime > _departTime, "Please input a valid departure and arrival time!"); 
        flightID[_flightID].airline = airlineName[msg.sender];
        flightID[_flightID].departTime = _departTime;
        flightID[_flightID].arriveTime = _arriveTime;
        flightID[_flightID].exist = true;
    }
    
    function orderInsurance(string memory _flightID) public payable flightExist(_flightID){
        require(msg.value >= 0.01 ether && msg.value <= 0.06 ether, "You can only pay between 0.01 to 0.06 ether for the premium!");
        require(flightID[_flightID].departTime - block.timestamp >= 12 hours, "You can only buy this insurance at least 12 hours before your flight departure!");
        require(address(this).balance - lockedBalance >= msg.value * 3, "Ether reserve in smart contract is too litte, please try again later!"); 
        
        history memory _order;
        _order.customer = msg.sender;
        _order.premiumPaid = msg.value;
        _order.orderedAt = block.timestamp;
        flightID[_flightID].orders.push(_order);
        lockedBalance += msg.value * 3;
    }
    
    function registerFlightEvent(string memory _flightID, uint _delayDuration, uint _delayReason) public onlyRegisteredAirline flightFinished(_flightID){
        require(keccak256(abi.encodePacked(flightID[_flightID].airline)) == keccak256(abi.encodePacked(airlineName[msg.sender])), "Please enter the flight from your airline!");
        
        flightID[_flightID].delayDuration = _delayDuration;

        if(_delayReason == 0){
            flightID[_flightID].delayReason = Delayed.None;
        } else if(_delayReason == 1){
            flightID[_flightID].delayReason = Delayed.LateArrival;
        } else if(_delayReason == 2){
            flightID[_flightID].delayReason = Delayed.MechanicalIssue;
        } else if(_delayReason == 3){
            flightID[_flightID].delayReason = Delayed.Weather;
        } else if(_delayReason == 4){
            flightID[_flightID].delayReason = Delayed.Canceled;
        }
        
        if(flightID[_flightID].delayReason == Delayed.Canceled){ 
            for(uint i = 0; i < flightID[_flightID].orders.length; i++){
                lockedBalance -= flightID[_flightID].orders[i].premiumPaid * 3; 
                payable(flightID[_flightID].orders[i].customer).transfer(flightID[_flightID].orders[i].premiumPaid);
            }
        } else if(flightID[_flightID].delayReason != Delayed.Canceled && flightID[_flightID].delayReason != Delayed.None){
            if(_delayDuration >= 45){
                for(uint i = 0; i < flightID[_flightID].orders.length; i++){
                    lockedBalance -= flightID[_flightID].orders[i].premiumPaid * 3;
                    payable(flightID[_flightID].orders[i].customer).transfer(flightID[_flightID].orders[i].premiumPaid * 3);
                }
            }
        }
    }
}