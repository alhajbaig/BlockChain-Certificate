const hre = require("hardhat");

async function main() {
  const CertifyChain = await hre.ethers.getContractFactory("CertifyChain");
  const certifyChain = await CertifyChain.deploy();

  await certifyChain.deployed();

  console.log("✅ CertifyChain deployed to:", certifyChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
