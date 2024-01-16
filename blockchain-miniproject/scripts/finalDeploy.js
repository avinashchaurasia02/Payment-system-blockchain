const hre = require("hardhat");
async function main() {
    const payment = await hre.ethers.getContractFactory("payment");
    const contract = await payment.deploy(); //instance of contract
  
    await contract.waitForDeployment();
    console.log("Address of contract:",await contract.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});