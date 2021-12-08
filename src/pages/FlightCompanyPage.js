import { useRef, useState, useEffect } from 'react';
import { useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import ContractABI from '../artifacts/contracts/FlightDelayInsurance.sol/FlightDelayInsurance.json';
import { utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightCompanyPage = () => {

    const flightID = useRef();
    const departTime = useRef();
    const arriveTime = useRef();

    const eventFlightID = useRef();
    const delayDuration = useRef();
    const delayReason = useRef();

    const [functionName, setFunctionName] = useState('');

    const contractInterface = new utils.Interface(ContractABI.abi);
    const contractAddress = '0x4ec57258BDCE96f3C4e5fe1b3f6f45e359be34f5';
    const contract = new Contract(contractAddress, contractInterface);

    const { state, send } = useContractFunction(contract, functionName);

    const registerFlight = () => {
        if(!flightID.current.value || !departTime.current.value || !arriveTime.current.value){
            toast.error("Please input the empty field!");
        } else {
            setFunctionName('registerFlight');
        }
    }

    const registerFlightEvent = () => {
        if(!eventFlightID.current.value || !delayDuration.current.value || !delayReason.current.value){
            toast.error("Please input the empty field!");
        } else{
            setFunctionName('registerFlightEvent');
        }
    }

    useEffect(() => {
        if(functionName === 'registerFlight'){
            const departUnix = new Date(departTime.current.value).getTime() / 1000;
            const arriveUnix = new Date(arriveTime.current.value).getTime() / 1000;
            send(flightID.current.value, departUnix, arriveUnix);
            setFunctionName('');
        } else if(functionName === 'registerFlightEvent'){
            send(eventFlightID.current.value, delayDuration.current.value, delayReason.current.value);
            setFunctionName('');
        }
    }, [functionName, send])

    useEffect(() => {
        if(state.errorMessage){
            toast.error(state.errorMessage);
        }
    }, [state])

    return (
        <div className="grid grid-cols-2 gap-4 mt-5 mx-10">
            {/* register flight */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl">
                <h1 className="text-center font-bold text-xl">Register Flight Data</h1>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/4">Flight ID</label>
                    <input ref={flightID} name="flight_id" type="text" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="depart" className="text-xl mr-5 inline-block text-right w-1/4">Departure Time</label>
                    <input ref={departTime} name="depart" type="datetime-local" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="arrive" className="text-xl mr-5 inline-block text-right w-1/4">Arrival Time</label>
                    <input ref={arriveTime} name="arrive" type="datetime-local" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="text-center mt-10">
                    <button onClick={registerFlight} className="py-2 px-3 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">Submit</button>
                </div>
            </div>
            {/* register flight event */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl">
                <h1 className="text-center font-bold text-xl">Register Flight Event</h1>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/4">Flight ID</label>
                    <input ref={eventFlightID} name="flight_id" type="text" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="duration" className="text-xl mr-5 inline-block text-right w-1/4">Delay Duration</label>
                    <input ref={delayDuration} name="duration" type="number" min="0" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="reason" className="text-xl mr-5 inline-block text-right w-1/4">Delay Reason</label>
                    <select ref={delayReason} name="reason" className="text-black border w-1/2 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3">
                        <option value="0">Not Delayed</option>
                        <option value="1">Previous flight late arrival</option>
                        <option value="2">Mechanical issue</option>
                        <option value="3">Bad weather condition</option>
                        <option value="4">Flight cancelled</option>
                    </select>
                </div>
                <div className="text-center mt-10">
                    <button onClick={registerFlightEvent} className="py-2 px-3 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">Submit</button>
                </div>
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

export default FlightCompanyPage;