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

### User Page
This page will be rendered when any unregistered wallet address is connected
![image](https://user-images.githubusercontent.com/81855912/145215062-ef4f201a-3def-4250-bdac-6ed134f07bfe.png)

### Airline Company Page
This page will be rendered when registered Airline Company wallet address is connected (0x9C625bbdCdE7d336006c106c716209a06c59A658)
![image](https://user-images.githubusercontent.com/81855912/145215520-4e0afc95-1c48-4daf-8651-bf4a3a014209.png)

### Owner Page
This page will be rendered when owner of the smart contract wallet address is connected (0x0D9d7fe338846A4B093d4A3A0a585A6752b66889)
![image](https://user-images.githubusercontent.com/81855912/145215727-06688c63-4e21-41de-8cd7-d6a557bb75b4.png)
