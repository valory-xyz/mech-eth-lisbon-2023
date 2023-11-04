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
    const agentRegistry = await ethers.getContractAt("AgentRegistry", agentRegistryAddress);

    // Transaction signing and execution
    // 3. EOA to change the manager of AgentRegistry via `changeManager(AgentRegistry)`;
    console.log("You are signing the following transaction: agentRegistry.connect(EOA).changeManager()");
    let result = await agentRegistry.connect(EOA).changeManager(agentFactoryAddress);
    // Transaction details
    console.log("Contract deployment: AgentRegistry");
    console.log("Contract address:", agentRegistryAddress);
    console.log("Transaction:", result.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
