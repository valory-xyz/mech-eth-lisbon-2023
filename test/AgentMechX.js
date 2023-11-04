/*global describe, context, beforeEach, it*/

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentMechX", function () {
    let AgentMech;
    let agentRegistry;
    let signers;
    let deployer;
    const agentHash = "0x" + "5".repeat(64);
    const AddressZero = "0x" + "0".repeat(40);
    const unitId = 1;
    const price = 1;
    const data = "0x";
    beforeEach(async function () {
        AgentMech = await ethers.getContractFactory("AgentMechX");

        // Get the agent registry contract
        const AgentRegistry = await ethers.getContractFactory("AgentRegistryX");
        agentRegistry = await AgentRegistry.deploy("agent", "MECH", "https://localhost/agent/");
        await agentRegistry.deployed();

        signers = await ethers.getSigners();
        deployer = signers[0];

        // Mint one agent
        await agentRegistry.changeManager(deployer.address);
        await agentRegistry.create(deployer.address, agentHash);
    });

    context("Initialization", async function () {
        it("Checking for arguments passed to the constructor", async function () {
            await expect(
                AgentMech.deploy(AddressZero, unitId, price)
            ).to.be.reverted;

            await expect(
                AgentMech.deploy(agentRegistry.address, unitId + 1, price)
            ).to.be.reverted;
        });
    });

    context("Request", async function () {
        it("Creating an agent mech and doing a request", async function () {
            const agentMech = await AgentMech.deploy(agentRegistry.address, unitId, price);

            // Try to supply less value when requesting
            await expect(
                agentMech.request(data)
            ).to.be.revertedWithCustomError(agentMech, "NotEnoughPaid");

            // Create a request
            await agentMech.request(data, {value: price});

            // Get the requests count
            const requestsCount = await agentMech.getRequestsCount(deployer.address);
            expect(requestsCount).to.equal(1);
        });


        it("Creating an agent mech and doing a request with subscription", async function () {
            const agentMech = await AgentMech.deploy(agentRegistry.address, unitId, price);

            // Try to supply less value when requesting
            await expect(
                agentMech.request(data)
            ).to.be.revertedWithCustomError(agentMech, "NotEnoughPaid");

            // Create a request
            await agentMech.subscribe(deployer.address, {value: price});

            // Create a request
            await agentMech.request(data);

            // Get the requests count
            const requestsCount = await agentMech.getRequestsCount(deployer.address);
            expect(requestsCount).to.equal(1);
        });
    });
});
