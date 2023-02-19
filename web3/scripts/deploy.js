const hre = require('hardhat');
const main = async () => {

  const DappCart = await hre.ethers.getContractFactory("DappCart");
  const dappCart = await DappCart.deploy("CodeLek Technology");

  await dappCart.deployed();

  console.log(`Smart Contracts Deployed to: ${dappCart.address}`
  );
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
