/*global process*/

const { ethers } = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

async function main() {
    const fs = require("fs");
    const globalsFile = "globals.json";
    const dataFromJSON = fs.readFileSync(globalsFile, "utf8");
    let parsedData = JSON.parse(dataFromJSON);
    const useLedger = parsedData.useLedger;
    const derivationPath = parsedData.derivationPath;
    const providerName = parsedData.providerName;
    const networkURL = parsedData.networkURL;
    const gasPriceInGwei = parsedData.gasPriceInGwei;
    const blockchainShortsName = parsedData.blockchainShortsName;
    const blockchainShortsSymbol = parsedData.blockchainShortsSymbol;
    const baseURI = parsedData.baseURI;
    let EOA;

    if (providerName === "gnosis") {
        if (!process.env.GNOSISSCAN_API_KEY) {
            console.log("set GNOSISSCAN_API_KEY env variable");
            return;
        }
    } else if (providerName === "neon") {
        if (!process.env.NEONSCAN_API_KEY) {
            console.log("set NEONSCAN_API_KEY env variable");
            return;
        }
    } else if (providerName === "zkevmpolygon") {
        if (!process.env.ZKSCAN_POLYGON_API_KEY) {
            console.log("set ZKSCAN_POLYGON_API_KEY env variable");
            return;
        }
    } else {
        console.log("Unknown network provider", providerName);
        return;
    }

    const provider = new ethers.providers.JsonRpcProvider(networkURL);
    // const signers = await ethers.getSigners();

    // if (useLedger) {
    //     EOA = new LedgerSigner(provider, derivationPath);
    // } else {
    //     EOA = signers[0];
    // }
    // // EOA address
    // const deployer = await EOA.getAddress();
    // console.log("EOA is:", deployer);

    // // Transaction signing and execution
    // console.log("1. EOA to deploy BlockchainShorts");
    // const BlockchainShorts = await ethers.getContractFactory("BlockchainShorts");
    // console.log("You are signing the following transaction: BlockchainShorts.connect(EOA).deploy()");
    // let blockchainShorts = await BlockchainShorts.connect(EOA).deploy(blockchainShortsName, blockchainShortsSymbol, baseURI);
    // if (gasPriceInGwei === "0") {
    //     ///
    // } else {
    //     const gasPrice = ethers.utils.parseUnits(gasPriceInGwei, "gwei");
    //     blockchainShorts = await BlockchainShorts.connect(EOA).deploy(blockchainShortsName, blockchainShortsSymbol, baseURI, { gasPrice });
    // }
    // const result = await blockchainShorts.deployed();

    // // Transaction details
    // console.log("Contract deployment: BlockchainShorts");
    // console.log("Contract address:", blockchainShorts.address);
    // console.log("Transaction:", result.deployTransaction.hash);

    // // Wait for half a minute for the transaction completion
    // await new Promise(r => setTimeout(r, 30000));

    // // Writing updated parameters back to the JSON file
    // parsedData.blockchainShortsAddress = blockchainShorts.address;
    // fs.writeFileSync(globalsFile, JSON.stringify(parsedData));

    // Contract verification
    if (parsedData.contractVerification) {
        const execSync = require("child_process").execSync;
        execSync("npx hardhat verify --constructor-args scripts/deployment/verify_03_blockchain_shorts.js --network " + providerName + " " + parsedData.blockchainShortsAddress, { encoding: "utf-8" });
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
