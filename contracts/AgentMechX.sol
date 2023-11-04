// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {AgentMech} from "../lib/ai-registry-mech/contracts/AgentMech.sol";

/// @title AgentMech - Smart contract for extending ERC721Mech
/// @dev A Mech that is operated by the holder of an ERC721 non-fungible token.
contract AgentMechX is AgentMech {
    event Subscription(address sender, address target, uint256 value);

    mapping(address => uint256) public subscriptionBalanceOf;

    /// @dev AgentMech constructor.
    /// @param _token Address of the token contract.
    /// @param _tokenId The token ID.
    /// @param _price The minimum required price.
    constructor(address _token, uint256 _tokenId, uint256 _price) AgentMech(_token, _tokenId, _price) {}

    /// @dev Registers a subscription
    /// @param target The address of the subscription owner.
    function subscribe(address target) external payable returns (bool) {
        
        subscriptionBalanceOf[target] += msg.value;

        emit Subscription(msg.sender, target, msg.value);

        return true;
    }

    /// @dev Performs actions before the request is posted.
    /// @param amount Amount of payment in wei.
    function _preRequest(uint256 amount, uint256 requestIdWithNonce, bytes memory data) internal override {
        // Check if paid by subscription
        if (amount == 0 && price <= subscriptionBalanceOf[msg.sender]) {
            subscriptionBalanceOf[msg.sender] - price;
            return;
        }
        super._preRequest(amount, requestIdWithNonce, data);
    }
}
