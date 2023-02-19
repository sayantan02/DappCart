require('@nomicfoundation/hardhat-toolbox');
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const { API_URL, PRIVATE_KEY } = process.env;

// For running on another chain.
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: API_URL, // Paste the HTTPS url here
      accounts: [`${PRIVATE_KEY}`] // This is the account Private Key, Details Described Below
    },
  },
};

// For running in localhost
// module.exports = {
//   solidity: "0.8.17",
// };
