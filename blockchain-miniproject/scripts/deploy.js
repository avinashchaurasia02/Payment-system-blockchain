const hre = require("hardhat");
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const payment = await hre.ethers.getContractFactory("payment");
  const contract = await payment.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:",await contract.getAddress());

  const addresses = [
    await owner.getAddress(),
    await from1.getAddress(),
    await from2.getAddress(),
    await from3.getAddress(),
  ];
  console.log("Before payment");
  await cosoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).dopayment("from1", "Very nice", amount);
  await contract.connect(from2).dopayment("from2", "great", amount);
  // await contract
  //   .connect(from3)
  //   .buyChai("from3", "Very nice information", amount);

  console.log("After payment");
  await cosoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// npx hardhat run scripts/deploy.js 