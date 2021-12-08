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

## 
