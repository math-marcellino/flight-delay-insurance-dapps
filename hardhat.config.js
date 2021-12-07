require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './src/artifacts'
  },
  defaultNetwork: 'ropsten',
  networks: {
    ropsten: {
      url: 'https://speedy-nodes-nyc.moralis.io/0f6aa643f70545beebc8e4f9/eth/ropsten',
      accounts: ['0xc811e4b509f4faf8042d6054dde1fae3c1278d5f5ab9cb9befa3f6e7fc408390']
    }
  }
};
