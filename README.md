# Flight Delay Insurance Decentralized Application

## Refer to the link below to access the full smart contract documentation
https://github.com/math-marcellino/Flight-Delay-Insurance-Smart-Contract/

## IF671-A Blockchain & Cryptocurrency Universitas Multimedia Nusantara
- Name : Matthew Marcellino
- NIM : 00000036291

## Project Overview
This decentralized application project provides decentralized flight delay insurance service which runs on Ethereum blockchain (currently Ropsten Testnet). In this dApps, people can buy insurance for their flight in case their flight schedule is delayed. This service runs on a blockchain so customer don't need to worry about paperworks, their data privacy, or even trust the insurance company. The claim process of this insurnace will be executed automatically once the condition is met, so customer can sit back and worry no more about the conventional time-consuming claim process.

There will be 3 user role in this dApp, which are :
- Owner/Admin : register airline company address, deposit or withdraw liquidity from smart contract
- Airline Company : register flight data and flight event
- Customer : order insurance

## Library and Tools
### Frontend and Styling
- React.js
- Tailwind CSS
- react-toastify

### Smart Contract Development & Testing
- Remix IDE
- Hardhat

### Client Interaction with Smart Contract
- ethers.js
- useDApp

## Quickstart
Clone the project from github
```
git clone https://github.com/math-marcellino/flight-delay-insurance-dapps.git
```

Install all the dependency
```
cd flight-delay-insurance-dapps
npm install
```

Compile the smart contract to generate contract artifacts
```
npx hardhat compile
```

Start the dapps
```
npm start
```

## Smart Contract Deployment Script
Deploy smart contract to Ropsten Testnet by executing deploy.js script
```
npx hardhat run .\scripts\deploy.js
```
Note that for this dApps, the smart contract has already been deployed to Ropsten Testnet so you don't need to run this script again.
```javascript
const hre = require("hardhat"); //using ethers.js library from hardhat

async function main() {
  const FlightDelayInsurance = await hre.ethers.getContractFactory("FlightDelayInsurance"); 
  const flightDelayInsurance = await FlightDelayInsurance.deploy();

  await flightDelayInsurance.deployed();

  console.log("Flight Delay Insurance is deployed to:", flightDelayInsurance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Interacting with Blockchain from Client-side
In this dApps, useDapp library is used to build interaction between client-side and the blockchain. useDapp is a library that provides a custom React Hooks that can be used to interact with blockchain (network, transaction, wallet, or smart contract).

### Connect Metamask Wallet to the Client-side Application
useDApp library has a custom react hook called "useEthers" that returns :
- activateBrowserWallet : a function that will open Metamask window on user's browser and connect their wallet to the dApps
- account : address of the currently connected wallet from Metamask
- deactivate : a function that will disconnect user's Metamask wallet from the dApps

```javascript
// activateBrowserWallet and deactivate function will be called on button click in React
const { activateBrowserWallet, account, deactivate } = useEthers();
```

### Getting Value from Smart Contract (public attribute or getter function)
useDApp has a custom react hook called "useContractCall" which can be used to call a public attribute or getter function from smart contract. This hook will take 3 arguments, which are abi, address, and method to be called, and then returns a value from smart contract.

```javascript
const contractBalance = useContractCall({
    abi: contractInterface,
    address: contractAddress,
    method: 'getContractBalance' //name of the method/function
})
```

### Execute Operation in Smart Contract Function
useDapp has a custom react hook called "useContractFunction" to call a setter function inside a smart contract. This hook will take 2 arguments, which are the contract abstract and the function name to be called. In this case, the hook will return :
- state : the state of the transaction (detailed information about the transaction, like success or fail, the gas fee used, etc)
- send : a function that can be used to call the smart contract setter function. It take serveral arguments that has been defined in smart contract setter function and a value (ETH amount to be transacted)

```javascript
const contractInterface = new utils.Interface(ContractABI.abi);
const contractAddress = '0x4ec57258BDCE96f3C4e5fe1b3f6f45e359be34f5';
const contract = new Contract(contractAddress, contractInterface);

// 'send' is a function that will be called on button click in React
const {state, send} = useContractFunction(contract, functionName);

// example of executing send() function
send(args1, {value: utils.parseEther(etherAmountToBeTransacted)});
```

## How to use the dApp
Make sure you have installed Metamask as your browser extension

https://metamask.io/

![image](https://user-images.githubusercontent.com/81855912/145211318-ad19247f-6968-4313-96d1-f7a21ca5c51e.png)

Choose Ropsten Test Network and make sure you have ETH balance in your wallet

![image](https://user-images.githubusercontent.com/81855912/145211513-cc6097fb-409d-4a47-89ff-0aabe230f3dd.png)

Connect your Metamask wallet 

![image](https://user-images.githubusercontent.com/81855912/145213977-bb370d2b-ba20-4091-b124-2a05d5f24948.png)

![image](https://user-images.githubusercontent.com/81855912/145214122-23db4953-1cb4-43b1-a8d2-b3650ae30e95.png)

Website will render specific page according to the user role. (Note : this functionality is still in development and still hard-coded)

## Owner Page
This page will be rendered when owner of the smart contract wallet address is connected (0x0D9d7fe338846A4B093d4A3A0a585A6752b66889)

![image](https://user-images.githubusercontent.com/81855912/145215727-06688c63-4e21-41de-8cd7-d6a557bb75b4.png)

### Deposit Liquidity

Owner can deposit the desired amount of ETH to the smart contract as reserve to provide liquidity to run the insurance service (like paying the customer's claim)

![image](https://user-images.githubusercontent.com/81855912/145315372-0fa95465-f48d-47b0-9f54-24a85a85be43.png)

Here is the function in the smart contract. This function has onlyOwner custom modifier that only allows owner to access this function.

```solidity
function depositEther() public onlyOwner payable{
    payable(address(this)).transfer(msg.value); //send ETH from owner to contract address
}
```

### Withdraw Liquidity

Owner can withdraw the desired amount of ETH from the smart contract to take the profit generated from the service.

![image](https://user-images.githubusercontent.com/81855912/145316185-c333a981-f054-4ce6-ae08-5794787dcb6c.png)

Here is the function in the smart contract. This function has onlyOwner custom modifier that only allows owner to access this function.

```solidity
function withdrawEther(uint ethAmount) public onlyOwner payable{
    uint availableBalance = address(this).balance - lockedBalance;
    uint weiAmount = ethAmount * 10**18; //conver eth to wei
    /*
      The line below will not allow the owner to withdraw all the liquidity inside the smart contract,
      but only the available balance (which is total balance - locked liquidity)
    */
    require(availableBalance >= weiAmount, "Not enough available ether to be withdrawn!");
    owner.transfer(weiAmount);
}
```

### Register Airline

Owner can register a wallet address as an airline company, which will grant them privilege to input flight data and flight event.

![image](https://user-images.githubusercontent.com/81855912/145317575-cf3facd6-c5da-47a6-ad4a-5ccfd571162b.png)

Here is the function in the smart contract. This function has onlyOwner custom modifier that only allows owner to access this function.

```solidity
function registerAirline(address _airlineAddr, string memory _name) public onlyOwner{
    //data will be stored in a mapping that will take airline address as key and airline name as value
    airlineName[_airlineAddr] = _name; 
}
```

## Airline Company Page
This page will be rendered when registered Airline Company wallet address is connected (0x9C625bbdCdE7d336006c106c716209a06c59A658)

![image](https://user-images.githubusercontent.com/81855912/145215520-4e0afc95-1c48-4daf-8651-bf4a3a014209.png)

### Register Flight Data

Airline Company can input a new flight data, which include the flight ID, departure time, and arrival time.

![image](https://user-images.githubusercontent.com/81855912/145318118-71b6eec9-3110-49a8-9da2-264afa6b3102.png)

Here is the function in the smart contract. This function has onlyRegisteredAirline custom modifier that only allows registered airline company to access this function.

```solidity
function registerFlight(string memory _flightID, uint _departTime, uint _arriveTime) public onlyRegisteredAirline{ 
    //input will be checked, if the arrival time is bigger than departure time, it will throw error message
    require(_arriveTime > _departTime, "Please input a valid departure and arrival time!"); 
    //data will be stored in a mapping that will take flightID as key and flightData struct as value
    flightID[_flightID].airline = airlineName[msg.sender];
    flightID[_flightID].departTime = _departTime;
    flightID[_flightID].arriveTime = _arriveTime;
    flightID[_flightID].exist = true;
}
```

### Register Flight Event

Airline Company can register a flight event of a registered flight, whether that flight is delayed or not, the reason of the delay and how long is the delay.

![image](https://user-images.githubusercontent.com/81855912/145319342-d5403191-e4a6-4359-a766-94c4a4856a4b.png)

Here is the function in the smart contract. This function has onlyRegisteredAirline custom modifier that only allows registered airline company to access this function. This function will also trigger the claim process for every address that buy the insurance for a specific flight if the delay condition is met.

```solidity
function registerFlightEvent(string memory _flightID, uint _delayDuration, uint _delayReason) public onlyRegisteredAirline flightFinished(_flightID){
    //comparing string of airline name from flight data and airline account (only the right airline can access a specific flight)
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

    /*
        The code below will execute the claim process for every customer.
        if the flight is canceled, then every customer that buy the insurance get refund
        if the flight is delayed for 45 minutes or more because of late arrival, mechanical issue, or weather, 
        then they will be paid 3 times the premium they paid
        if the flight is not delayed (or delayed < 45 minutes) nor canceled, customer will not receive anything
    */
    if(flightID[_flightID].delayReason == Delayed.Canceled){ 
        for(uint i = 0; i < flightID[_flightID].orders.length; i++){
            lockedBalance -= flightID[_flightID].orders[i].premiumPaid * 3; //balance unlocked
            payable(flightID[_flightID].orders[i].customer).transfer(flightID[_flightID].orders[i].premiumPaid);
        }
    } else if(flightID[_flightID].delayReason != Delayed.Canceled && flightID[_flightID].delayReason != Delayed.None){
        if(_delayDuration >= 45){
            for(uint i = 0; i < flightID[_flightID].orders.length; i++){
                lockedBalance -= flightID[_flightID].orders[i].premiumPaid * 3; //balance unlocked
                payable(flightID[_flightID].orders[i].customer).transfer(flightID[_flightID].orders[i].premiumPaid * 3);
            }
        }
    }
}
```

## User Page
This page will be rendered when any unregistered wallet address is connected. In this page, customer can buy a flight delay insurance by inputting their flight ID and the amount of ETH they want to pay. The insurance details and rules are shown on the right side of the screen.

![image](https://user-images.githubusercontent.com/81855912/145215062-ef4f201a-3def-4250-bdac-6ed134f07bfe.png)

Here is the function in the smart contract.

```solidity
function orderInsurance(string memory _flightID) public payable flightExist(_flightID){
    require(msg.value >= 0.01 ether && msg.value <= 0.06 ether, "You can only pay between 0.01 to 0.06 ether for the premium!");
    require(flightID[_flightID].departTime - block.timestamp >= 12 hours, "You can only buy this insurance at least 12 hours before your flight departure!");
    require(address(this).balance - lockedBalance >= msg.value * 3, "Ether reserve in smart contract is too litte, please try again later!"); 

    history memory _order;
    _order.customer = msg.sender;
    _order.premiumPaid = msg.value;
    _order.orderedAt = block.timestamp;
    flightID[_flightID].orders.push(_order);
    /* 
        When customer order an insurance, the smart contract will automatically lock 3 times of the premium paid by customer
        to insure that there is enough liquidity to pay to customer when the delay condition is met.
    */
    lockedBalance += msg.value * 3;
}
```

## Future Work & Improvement
- This dApps doesn't have funtionality to show the list of registered airline company, history of user's orders, and list of flights due to the complexity of querying data from smart contract, so it will be implemented in near future.
- Website design & user interface improvement.
- Getting flight data from real world flight data API.
