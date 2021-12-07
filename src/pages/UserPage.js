const UserPage = () => {
    return (
        <div className="grid grid-cols-7 gap-4 mt-5 mx-10">
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
                <h1 className="text-center font-bold text-xl">Buy Flight Delay Insurance</h1>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">Flight ID</label>
                    <input name="floght_id" type="text" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">Premium</label>
                    <input name="flight_id" placeholder="Enter between 0.01 - 0.03 ETH" type="number" min="0.01" max="0.06" step="0.01" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="text-center mt-10">
                    <button className="py-2 px-8 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">Buy</button>
                </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-4">
                <h1 className="text-center font-bold text-xl">Insurance Details and Rules</h1>
            </div>
        </div>
    )
}

export default UserPage;