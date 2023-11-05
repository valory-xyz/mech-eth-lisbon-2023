// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {GenericRegistry, ERC721} from "../lib/autonolas-registries/contracts/GenericRegistry.sol";

/// @title Blockchain Shorts - Smart contract for registering short AI generated videos
contract BlockchainShorts is GenericRegistry {
    event CreateBlockchainShort(uint256 id, bytes32 hash);

    // Map of Id => IPFS hash
    mapping(uint256 => bytes32) public mapIdHash;

    /// @dev BlockchainShorts constructor.
    /// @param _name BlockchainShorts contract name.
    /// @param _symbol BlockchainShortscontract symbol.
    /// @param _baseURI BlockchainShorts token base URI.
    constructor(string memory _name, string memory _symbol, string memory _baseURI)
        ERC721(_name, _symbol)
    {
        baseURI = _baseURI;
        owner = msg.sender;
    }

    /// @dev Creates unit.
    /// @param owner Owner of the blockchain short.
    /// @param hash IPFS CID hash of the blockchain short.
    /// @return id The id of a minted unit.
    function create(address owner, bytes32 hash)
        external virtual returns (uint256 id)
    {
        // Reentrancy guard
        if (_locked > 1) {
            revert ReentrancyGuard();
        }
        _locked = 2;

        // Checks for a non-zero owner address
        if(owner == address(0)) {
            revert ZeroAddress();
        }

        // Check for the non-zero hash value
        if (hash == 0) {
            revert ZeroValue();
        }

        id = totalSupply;
        // Blockchain short with Id = 0 is left empty not to do additional checks for the index zero
        id++;

        // Store the hash
        mapIdHash[id] = hash;

        // Set total supply to the Id number
        totalSupply = id;
        // Safe mint is needed since contracts can create units as well
        _safeMint(owner, id);

        emit CreateBlockchainShort(id, hash);
        _locked = 1;
    }

    /// @dev Gets the hash of the unit.
    /// @param unitId Unit Id.
    /// @return Unit hash.
    function _getUnitHash(uint256 unitId) internal view override returns (bytes32) {
        return mapIdHash[unitId];
    }
}
