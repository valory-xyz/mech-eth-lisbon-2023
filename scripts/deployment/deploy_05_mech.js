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
    const agentRegistryAddress = parsedData.agentRegistryAddress;
    const agentFactoryAddress = parsedData.agentFactoryAddress;
    const price = parsedData.price;
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
    const signers = await ethers.getSigners();

    if (useLedger) {
        EOA = new LedgerSigner(provider, derivationPath);
    } else {
        EOA = signers[0];
    }
    // EOA address
    const deployer = await EOA.getAddress();
    console.log("EOA is:", deployer);

    // Get all the contracts
    const agentFactory = await ethers.getContractAt("AgentFactory", agentFactoryAddress);

    // Transaction signing and execution
    // 3. EOA to change the manager of AgentRegistry via `changeManager(AgentRegistry)`;
    console.log("You are signing the following transaction: agentFactory.connect(EOA).create()");
    let result = await agentFactory.connect(EOA).create(deployer, "0x0000000000000000000000000000000000000000000000000000000000000001", price);
    // Transaction details
    console.log("Contract interaction: agentFactory");
    console.log("Contract address:", agentFactoryAddress);
    console.log("Transaction:", result.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
