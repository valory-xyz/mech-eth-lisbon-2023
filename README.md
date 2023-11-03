# mech-eth-lisbon-2023

## Introduction

This repo extends AgentMech for Eth Lisbon 2023.

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
