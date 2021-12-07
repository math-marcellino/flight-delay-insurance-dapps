import './App.css';
import './index.css';
import AdminPage from './pages/AdminPage';
import WalletConnectButton from './components/WalletConnectButton';
import { useEthers } from '@usedapp/core';
import FlightCompanyPage from './pages/FlightCompanyPage';
import UserPage from './pages/UserPage';

const App = () => {

  const { account } = useEthers();

  const ownerAddress = '0x0D9d7fe338846A4B093d4A3A0a585A6752b66889';
  const garudaIndonesiaAddress = '0x9C625bbdCdE7d336006c106c716209a06c59A658';

  return (
    <div className="text-white">
      <div className="flex justify-end mt-5 mx-10">
        <WalletConnectButton/>
      </div>
      {account === ownerAddress && <AdminPage/>}
      {account === garudaIndonesiaAddress && <FlightCompanyPage/>}
      {account !== ownerAddress && account !==garudaIndonesiaAddress && account && <UserPage/>}
      {!account && (
        <div className="flex justify-center">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center m-20 w-max">
            <h1 className="text-center font-bold text-xl">Connect your wallet to use the app!</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
