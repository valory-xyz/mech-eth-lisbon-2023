// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {AgentMechX} from "./AgentMechX.sol";
import {AgentFactory} from "../lib/ai-registry-mech/contracts/AgentFactory.sol";

/// @title Agent Factory - Periphery smart contract for managing agent and mech creation
contract AgentFactoryX is AgentFactory {

    constructor(address _agentRegistry) AgentFactory (_agentRegistry) {}

    /// @dev Creates the mech instance.
    /// @param salt The generated salt.
    /// @param _agentRegistry The agent registry address.
    /// @param agentId The id of a created agent.
    /// @param price Minimum required payment the agent accepts.
    /// @return mech The created mech instance address.
    function _createMech(
        bytes32 salt,
        address _agentRegistry,
        uint256 agentId,
        uint256 price
    ) internal override returns (address mech) {
        mech = address((new AgentMechX){salt: salt}(_agentRegistry, agentId, price));
    }
}
