/*global process*/

require("hardhat-contract-sizer");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-gas-reporter");
require("hardhat-tracer");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");

let TESTNET_MNEMONIC = process.env.TESTNET_MNEMONIC;

const accounts = {
    mnemonic: TESTNET_MNEMONIC,
    path: "m/44'/60'/0'/0",
    initialIndex: 0,
    count: 20,
};

if (!TESTNET_MNEMONIC) {
    // Generated with bip39
    accounts.mnemonic = "velvet deliver grief train result fortune travel voice over subject subject staff nominee bone name";
    accounts.accountsBalance = "100000000000000000000000000";
}

const ZKSCAN_API_KEY = process.env.ZKSCAN_API_KEY;
const NEONSCAN_API_KEY = process.env.NEONSCAN_API_KEY;
const GNOSISSCAN_API_KEY = process.env.GNOSISSCAN_API_KEY;

module.exports = {
    networks: {
        local: {
            url: "http://localhost:8545",
        },
        gnosis: {
            url: "https://rpc.gnosischain.com",
            accounts: accounts,
            chainId: 100,
        },
        zkevmpolygon: {
            url: "https://zkevm-rpc.com",
            accounts: accounts,
            chainId: 1101,
        },
        neon: {
            url: "https://neon-proxy-mainnet.solana.p2p.org",
            accounts: accounts,
            chainId: 245022934,
        },
        hardhat: {
            allowUnlimitedContractSize: true
        },
    },
    etherscan: {
        customChains: [
            {
                network: "gnosis",
                chainId: 100,
                urls: {
                    apiURL: "https://api.gnosisscan.io/api",
                    browserURL: "https://gnosisscan.io/"
                },
            },
            {
                network: "zkevmpolygon",
                chainId: 1101,
                urls: {
                    apiURL: "https://zkevm-rpc.com",
                    browserURL: "https://zkevm.polygonscan.com/"
                },
            },
            {
                network: "neon",
                chainId: 245022934,
                urls: {
                    apiURL: "https://neon-proxy-mainnet.solana.p2p.org",
                    browserURL: "https://neonscan.org/"
                },
            },
        ],
        apiKey: {
            zkevmpolygon: ZKSCAN_API_KEY,
            gnosis: GNOSISSCAN_API_KEY,
            neon: NEONSCAN_API_KEY,
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.21",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                },
            }
        ]
    },
    gasReporter: {
        enabled: true
    }
};
