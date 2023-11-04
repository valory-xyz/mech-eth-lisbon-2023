// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {AgentRegistry} from "../lib/ai-registry-mech/contracts/AgentRegistry.sol";

/// @title Agent Registry - Smart contract for registering agents
contract AgentRegistryX is AgentRegistry {

    /// @dev Agent registry constructor.
    /// @param _name Agent registry contract name.
    /// @param _symbol Agent registry contract symbol.
    /// @param _baseURI Agent registry token base URI.
    constructor(string memory _name, string memory _symbol, string memory _baseURI) AgentRegistry(_name, _symbol, _baseURI) {}
}
