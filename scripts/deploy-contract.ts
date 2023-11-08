import hre from "hardhat";

async function main() {
  // Deploying
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = hre.ethers.parseEther("0.001");

  const contractFactory = await hre.ethers.getContractFactory("Lock");
  const proxyContractInstance = await hre.upgrades.deployProxy(
    contractFactory,
    [unlockTime],
    {
      initializer: "initialize",
      kind: "uups"
    }
  );
  await proxyContractInstance.waitForDeployment();
  return proxyContractInstance;
}

main()
  .then(async (contract) => {
    const proxyContractInstanceAddress = await contract.getAddress();
    console.log(
      "Lock Proxy contract deployed to:",
      proxyContractInstanceAddress
    );
    // Read from contract
  })
  .catch((error) => {
    console.error(error);
  });
