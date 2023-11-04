/*global process*/

const { ethers } = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

const { SafeFactory, EthersAdapter } = require("@safe-global/protocol-kit")


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
    const safeOwner = provider.getSigner(0)

    if (useLedger) {
        EOA = new LedgerSigner(provider, derivationPath);
    } else {
        EOA = signers[0];
    }

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: safeOwner
    })

    // EOA address
    const deployer = await EOA.getAddress();
    console.log("EOA is:", deployer);

    safeVersion = "1.3.0"
    const safeFactory = await SafeFactory.create({ ethAdapter, safeVersion })

    const owners = [deployer, "0x87b85ed1E049D2023CF51f92C04103CCD4107c9c"]
    const threshold = 1
    const safeAccountConfig = {
      owners,
      threshold
    }
    /// singleton: 0xfb1bffC9d739B8D520DaF37dF666da4C687191EA
    /// initializer: 0x0xb63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000017062a1dE2FE6b99BE3d9d37841FeD19F5738040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eb2a22b27c7ad5eee424fd90b376c745e60f914e00000000000000000000000087b85ed1e049d2023cf51f92c04103ccd4107c9c0000000000000000000000000000000000000000000000000000000000000000
    /// saltNonce: 1699103125620

    // Transaction signing and execution
    // 3. EOA to deploy safe;
    console.log("You are signing the following transaction: deploy safe");
    const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })

    const newSafeAddress = await safeSdk.getAddress()
    console.log("New safe address:", newSafeAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
