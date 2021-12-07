import { useEthers } from "@usedapp/core";

const WalletConnectButton = () => {
    const { activateBrowserWallet, account } = useEthers();

    return account ? (
        <div className="bg-indigo-800 p-3 rounded-xl">
            <h1 className="text-sm text-white">Welcome, {account}</h1>
        </div>
    ) : (
        <button className="p-3 bg-indigo-800 text-white text-sm rounded-xl hover:bg-indigo-900" onClick={() => {activateBrowserWallet()}}>Connect Wallet</button>
    )
}

export default WalletConnectButton;