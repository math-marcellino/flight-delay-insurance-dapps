import { useContractFunction } from "@usedapp/core";
import { utils } from 'ethers';
import { useEffect, useRef } from 'react';
import { Contract } from "@ethersproject/contracts";
import ContractABI from '../artifacts/contracts/FlightDelayInsurance.sol/FlightDelayInsurance.json';
import { Interface } from "@ethersproject/abi";
import { toast, ToastContainer } from "react-toastify";

const UserPage = () => {

    const flightID = useRef();
    const premiumPaid = useRef();

    const contractInterface = new Interface(ContractABI.abi);
    const contractAddress = '0x4ec57258BDCE96f3C4e5fe1b3f6f45e359be34f5';
    const contract = new Contract(contractAddress, contractInterface);

    const { state, send } = useContractFunction(contract, 'orderInsurance');

    const orderInsurance = () => {
        if(!flightID.current.value || !premiumPaid.current.value){
            toast.error("Please input the empty field!");
        } else {
            send(flightID.current.value, {value: utils.parseEther(premiumPaid.current.value)})
        }
    }

    useEffect(() => {
        if(state.errorMessage){
            toast.error(state.errorMessage);
        }
    }, [state])

    return (
        <div className="grid grid-cols-7 gap-4 mt-5 mx-10">
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
                <h1 className="text-center font-bold text-xl">Buy Flight Delay Insurance</h1>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">Flight ID</label>
                    <input ref={flightID} name="flight_id" type="text" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">Premium</label>
                    <input ref={premiumPaid} name="flight_id" placeholder="Enter between 0.01 - 0.06 ETH" type="number" min="0.01" max="0.06" step="0.01" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="text-center mt-10">
                    <button onClick={orderInsurance} className="py-2 px-8 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">Buy</button>
                </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-4">
                <h1 className="text-center font-bold text-xl">Insurance Details and Rules</h1>
                <ul className="list-inside list-decimal mt-5 p-5 bg-gray-900 rounded-xl">
                    <li>Customer can only buy insurance for a registered flight in the smart contract</li>
                    <li>Customer can only claim the insurance if the delay is at least 45 minutes or more</li>
                    <li>Accepted delay reason for claim : previous flight late arrival, mechanical issues, bad weather condition, and flight cancelation</li>
                    <li>Customer can only pay between 0.01 - 0.06 ETH for the premium</li>
                    <li>Customer can only buy the insurance 12 hours prior to the flight departure to prevent smart contract exploitation</li>
                    <li>Customer order will revert if the contract doesn't have enough liquidity to pay customer</li>
                    <li>Claim process will be automatic, ETH will be sent to customer's wallet once the insurance conditions are fulfilled</li>
                    <li>The claim amount will be 3 times of the premium the customer paid</li>
                </ul>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}

export default UserPage;