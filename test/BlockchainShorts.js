/*global describe, context, beforeEach, it*/

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlockchainShorts", function () {
    let agentRegistry;
    let signers;
    const agentHash = "0x" + "9".repeat(64);
    const agentHash2 = "0x" + "2".repeat(64);
    const AddressZero = "0x" + "0".repeat(40);
    beforeEach(async function () {
        const BlockchainShorts = await ethers.getContractFactory("BlockchainShorts");
        agentRegistry = await BlockchainShorts.deploy("BlockchainShorts", "BS", "https://localhost/agent/");
        await agentRegistry.deployed();
        signers = await ethers.getSigners();
    });

    context("Initialization", async function () {
        it("Checking for arguments passed to the constructor", async function () {
            expect(await agentRegistry.name()).to.equal("BlockchainShorts");
            expect(await agentRegistry.symbol()).to.equal("BS");
            expect(await agentRegistry.baseURI()).to.equal("https://localhost/agent/");
        });

        it("Should fail when checking for the token id existence", async function () {
            const tokenId = 0;
            expect(await agentRegistry.exists(tokenId)).to.equal(false);
        });

        it("Should fail when trying to change the manager from a different address", async function () {
            await expect(
                agentRegistry.connect(signers[1]).changeManager(signers[1].address)
            ).to.be.revertedWithCustomError(agentRegistry, "OwnerOnly");
        });

        it("Setting the base URI", async function () {
            await agentRegistry.setBaseURI("https://localhost2/agent/");
            expect(await agentRegistry.baseURI()).to.equal("https://localhost2/agent/");
        });
    });

    context("BS creation", async function () {
        it("Should fail when creating an agent with a zero owner address", async function () {
            const mechManager = signers[1];
            await expect(
                agentRegistry.connect(mechManager).create(AddressZero, agentHash)
            ).to.be.revertedWithCustomError(agentRegistry, "ZeroAddress");
        });

        it("Token Id=1 after first successful agent creation must exist ", async function () {
            const user = signers[2];
            const tokenId = 1;
            const mechManager = signers[1];
            await agentRegistry.connect(mechManager).create(user.address,
                agentHash);
            expect(await agentRegistry.balanceOf(user.address)).to.equal(1);
            expect(await agentRegistry.exists(tokenId)).to.equal(true);
        });

        it("Catching \"Transfer\" event log after successful creation of an agent", async function () {
            const mechManager = signers[1];
            const user = signers[2];
            const agent = await agentRegistry.connect(mechManager).create(user.address, agentHash);
            const result = await agent.wait();
            expect(result.events[0].event).to.equal("Transfer");
        });

        it("Getting agent info after its creation", async function () {
            const mechManager = signers[1];
            const user = signers[2];
            const tokenId = 1;
            await agentRegistry.connect(mechManager).create(user.address, agentHash2);

            expect(await agentRegistry.ownerOf(tokenId)).to.equal(user.address);
            let unitHash = await agentRegistry.mapIdHash(tokenId);
            expect(unitHash).to.equal(agentHash2);

            // Getting info about non-existent agent Id
            await expect(
                agentRegistry.ownerOf(tokenId + 1)
            ).to.be.revertedWith("NOT_MINTED");
            unitHash = await agentRegistry.mapIdHash(tokenId + 1);
            expect(unitHash).to.equal("0x" + "0".repeat(64));
        });
    });
});
