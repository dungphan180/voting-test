/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config();
const privateKey = process.env["PRIVATE_KEY"];
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  plugins: ["truffle-plugin-verify", "truffle-contract-size"],
  api_keys: {
    bscscan: "EH2PYMTXXQ1TKGMMEMZDSTN3RJKCV5YQM2",
    polygonscan: "URP2C49WYRXZXK9YJREH86P6V1UN8GFANU",
  },
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    bscTestnet: {
      networkCheckTimeout: 100000,
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: `https://nd-322-915-601.p2pify.com/f47f33f6f54db17356b7a8aabb9ed547`, // `https://data-seed-prebsc-1-s1.binance.org:8545/`
        }),
      network_id: 97,
      confirmations: 5,
      timeoutBlocks: 200000,
      skipDryRun: true,
    },
    bsc: {
      networkCheckTimeout: 100000,
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: `https://bsc-dataseed3.binance.org`, // https://bsc-dataseed2.binance.org`
        }),
      network_id: 56,
      confirmations: 5,
      timeoutBlocks: 200000,
      skipDryRun: true,
    },
    polygonTestnet: {
      networkCheckTimeout: 100000,
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          // providerOrUrl: `https://rpc.ankr.com/polygon_mumbai`,
          // providerOrUrl: `https://rpc-mumbai.maticvigil.com/`,
          providerOrUrl: `https://nd-850-321-280.p2pify.com/ce9bd0aa75cb8a7b59e6c8bf77dc241c`,
        }),
      network_id: 80001,
      confirmations: 10,
      timeoutBlocks: 200000,
      skipDryRun: true,
      gas: 8500000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 50000000000,
    },

    //
    // goerli: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraProjectId}`),
    //   network_id: 5,       // Goerli's id
    //   chain_id: 5
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin
    },
  },
};
