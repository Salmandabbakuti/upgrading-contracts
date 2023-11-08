import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

const accounts = vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545"
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts
    }
  },
  etherscan: {
    // API key for Polygonscan
    apiKey: vars.get("ETHERSCAN_API_KEY")
  }
};

export default config;
