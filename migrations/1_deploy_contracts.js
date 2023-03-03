const {
  deployProxy,
  upgradeProxy,
  forceImport,
} = require("@openzeppelin/truffle-upgrades");
const { deploy } = require("@openzeppelin/truffle-upgrades/dist/utils");

const Voting = artifacts.require("Voting");

module.exports = async function (deployer, network, accounts) {
  if (network === "bscTestnet") {
    const tokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
    await deployer.deploy(Voting, tokenAddress);
  } else if (network === "bsc") {
    await deployer.deploy(Voting, tokenAddress);
  } else if (network === "polygonTestnet") {
    const tokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
    await deployer.deploy(Voting, tokenAddress);
  }
};
