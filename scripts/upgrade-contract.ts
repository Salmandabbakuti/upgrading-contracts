import hre from "hardhat";

async function main() {
  // Upgrading
  // when we upgrade later we need to define proxy address and ugrade.
  const PROXY_ADDRESS = "0xfE4F7439B896987F7FFAF752367074D8aAf03fEE"; // this is the address of the proxy contract. Replace this with your own proxy contract address.
  const updatedContractFactory = await hre.ethers.getContractFactory(
    "LockUpdated"
  );
  const updatedContractInstance = await hre.upgrades.upgradeProxy(
    PROXY_ADDRESS,
    updatedContractFactory
  );
  await updatedContractInstance.waitForDeployment();
  return updatedContractInstance;
}

main()
  .then(async (contract) => {
    const updatedContractInstanceAddress = await contract.getAddress();
    console.log("Lock contract upgraded to:", updatedContractInstanceAddress);
    // Read from contract
  })
  .catch((error) => {
    console.error(error);
  });
