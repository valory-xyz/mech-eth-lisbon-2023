# mech-eth-lisbon-2023

## Introduction

This repo extends AgentMech for Eth Lisbon 2023.

### Gnosis Deployment:

- [AgentRegistryX](https://gnosisscan.io/address/0x84B4DA67B37B1EA1dea9c7044042C1d2297b80a0)
- [AgentFactoryX](https://gnosisscan.io/address/0x2C3F556Ff33B6b5279C85CA99ed2Ba8351A2E9Bf)
- [First Mech](https://gnosisscan.io/address/0x1847f93501704f9aa67fe8af5de7e999af5d0970) 
- [BlockchainShorts](https://gnosisscan.io/address/0x4891f5894634DcD6d11644fe8E56756EF2681582)

### zkEVM Polygon Deployment:

- [AgentRegistryX](https://zkevm.polygonscan.com/address/0xE3607b00E75f6405248323A9417ff6b39B244b50)
- [AgentFactoryX](https://zkevm.polygonscan.com/address/0x3C1fF68f5aa342D296d4DEe4Bb1cACCA912D95fE)
- [First Mech](https://zkevm.polygonscan.com/address/0x101b799648efa84ddbfd7c64ec708107317d62e4) 
- [BlockchainShorts](https://zkevm.polygonscan.com/address/0x34C895f302D0b5cf52ec0Edd3945321EB0f83dd5)

### Neon Deployment:

- [AgentRegistryX](https://neonscan.org/address/0x9338b5153AE39BB89f50468E608eD9d764B755fD)
- [AgentFactoryX](https://neonscan.org/address/0xE3607b00E75f6405248323A9417ff6b39B244b50)
- [First Mech](https://neonscan.org/address/0xd81964075e24b6f8e4e1569c5f08e6697d9f2d25) 
- [BlockchainShorts](https://neonscan.org/address/0x3d77596beb0f130a4415df3D2D8232B3d3D31e44)

## Development

### Prerequisites
- This repository follows the standard [`Hardhat`](https://hardhat.org/tutorial/) development process.
- The code is written on Solidity `0.8.19`.
- The standard versions of Node.js along with Yarn are required to proceed further (confirmed to work with Yarn `1.22.10` and npx/npm `6.14.11` and node `v12.22.0`).

### Install the dependencies
The project has submodules to get the dependencies. Make sure you run `git clone --recursive` or init the submodules yourself.
The dependency list is managed by the `package.json` file, and the setup parameters are stored in the `hardhat.config.js` file.
Simply run the following command to install the project:
```
yarn install
```

### Core components
The contracts, deployment scripts and tests are located in the following folders respectively:
```
contracts
scripts
test
```

### Compile the code and run
Compile the code:
```
npx hardhat compile
```
Run the tests:
```
npx hardhat test
```

## Deployment and redeployment
The deployment of contracts to the test- and main-net is split into step-by-step series of scripts for more control and checkpoint convenience.
The description of deployment procedure can be found here: [deployment](https://github.com/valory-xyz/mech-eth-lisbon-2023/blob/main/scripts/deployment).

The finalized contract ABIs for deployment and their number of optimization passes are located here: [ABIs](https://github.com/valory-xyz/mech-eth-lisbon-2023/blob/main/abis).
Each folder there contains contracts compiled with the solidity version before their deployment.

## Acknowledgements
See [here](https://github.com/valory-xyz/ai-registry-mech/README.md)
