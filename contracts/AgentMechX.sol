// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {AgentMech} from "../lib/ai-registry-mech/contracts/AgentMech.sol";

/// @title AgentMech - Smart contract for extending ERC721Mech
/// @dev A Mech that is operated by the holder of an ERC721 non-fungible token.
contract AgentMechX is AgentMech {

    /// @dev AgentMech constructor.
    /// @param _token Address of the token contract.
    /// @param _tokenId The token ID.
    /// @param _price The minimum required price.
    constructor(address _token, uint256 _tokenId, uint256 _price) AgentMech(_token, _tokenId, _price) {
    }
}
