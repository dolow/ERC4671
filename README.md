---
eip: 4671
title: Non-Tradable Tokens Standard
description: A standard interface for non-tradable tokens, aka badges or souldbound NFTs.
author: Omar Aflak (@omaraflak), Pol-Malo Le Bris, Marvin Martin (@MarvinMartin24)
discussions-to: https://ethereum-magicians.org/t/eip-4671-non-tradable-token/7976
status: Review
type: Standards Track
category: ERC
created: 2022-01-13
requires: 165
---

## Abstract

A non-tradable token, or NTT, represents inherently personal possessions (material or immaterial), such as university diplomas, online training certificates, government issued documents (national id, driving license, visa, wedding, etc.), labels, and so on.

As the name implies, non-tradable tokens are not made to be traded or transferred, they are "soulbound". They don't have monetary value, they are personally delivered to **you**, and they only serve as a **proof of possession/achievement**.

In other words, the possession of a token carries a strong meaning in itself depending on **why** it was delivered.

## Motivation

We have seen in the past smart contracts being used to deliver university diplomas or driving licenses, for food labeling or attendance to events, and much more. All of these implementations are different, but they have a common ground: the tokens are **non-tradable**.

The blockchain has been used for too long as a means of speculation, and non-tradable tokens want to be part of the general effort aiming to provide usefulness through the blockchain.

By providing a common interface for non-tradable tokens, we allow more applications to be developed and we position blockchain technology as a standard gateway for verification of personal possessions and achievements.

## Specification

### Non-Tradable Token

A NTT contract is seen as representing **one type of certificate** delivered by **one authority**. For instance, one NTT contract for the French National Id, another for Ethereum EIP creators, and so on...

* An address might possess multiple tokens. Each token has a unique identifier: `tokenId`.
* An authority who delivers a certificate should be in position to revoke it. Think of driving licenses or weddings. However, it cannot delete your token, i.e. the record will show that you once owned a token from that contract.
* The most typical usage for third-parties will be to verify if a user has a valid token in a given contract.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IERC4671 is IERC165 {
    /// Event emitted when a token `tokenId` is minted for `owner`
    event Minted(address owner, uint256 tokenId);

    /// Event emitted when token `tokenId` of `owner` is revoked
    event Revoked(address owner, uint256 tokenId);

    /// @notice Count all tokens assigned to an owner
    /// @param owner Address for whom to query the balance
    /// @return Number of tokens owned by `owner`
    function balanceOf(address owner) external view returns (uint256);

    /// @notice Get owner of a token
    /// @param tokenId Identifier of the token
    /// @return Address of the owner of `tokenId`
    function ownerOf(uint256 tokenId) external view returns (address);

    /// @notice Check if a token hasn't been revoked
    /// @param tokenId Identifier of the token
    /// @return True if the token is valid, false otherwise
    function isValid(uint256 tokenId) external view returns (bool);

    /// @notice Check if an address owns a valid token in the contract
    /// @param owner Address for whom to check the ownership
    /// @return True if `owner` has a valid token, false otherwise
    function hasValid(address owner) external view returns (bool);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Extensions

##### Metadata

An interface allowing to add metadata linked to each token.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671Metadata.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671Metadata.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4671.sol";

interface IERC4671Metadata is IERC4671 {
    /// @return Descriptive name of the tokens in this contract
    function name() external view returns (string memory);

    /// @return An abbreviated name of the tokens in this contract
    function symbol() external view returns (string memory);

    /// @notice URI to query to get the token's metadata
    /// @param tokenId Identifier of the token
    /// @return URI for the token
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

##### Enumerable

An interface allowing to enumerate the tokens of an owner.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671enumerable.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671enumerable.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4671.sol";

interface IERC4671Enumerable is IERC4671 {
    /// @return emittedCount Number of tokens emitted
    function emittedCount() external view returns (uint256);

    /// @return holdersCount Number of token holders  
    function holdersCount() external view returns (uint256);

    /// @notice Get the tokenId of a token using its position in the owner's list
    /// @param owner Address for whom to get the token
    /// @param index Index of the token
    /// @return tokenId of the token
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);

    /// @notice Get a tokenId by it's index, where 0 <= index < total()
    /// @param index Index of the token
    /// @return tokenId of the token
    function tokenByIndex(uint256 index) external view returns (uint256);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

##### Delegation

An interface allowing delegation rights of token minting.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671Delegate.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671Delegate.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4671.sol";

interface IERC4671Delegate is IERC4671 {
    /// @notice Grant one-time minting right to `operator` for `owner`
    /// An allowed operator can call the function to transfer rights.
    /// @param operator Address allowed to mint a token
    /// @param owner Address for whom `operator` is allowed to mint a token
    function delegate(address operator, address owner) external;

    /// @notice Grant one-time minting right to a list of `operators` for a corresponding list of `owners`
    /// An allowed operator can call the function to transfer rights.
    /// @param operators Addresses allowed to mint
    /// @param owners Addresses for whom `operators` are allowed to mint a token
    function delegateBatch(address[] memory operators, address[] memory owners) external;

    /// @notice Mint a token. Caller must have the right to mint for the owner.
    /// @param owner Address for whom the token is minted
    function mint(address owner) external;

    /// @notice Mint tokens to multiple addresses. Caller must have the right to mint for all owners.
    /// @param owners Addresses for whom the tokens are minted
    function mintBatch(address[] memory owners) external;

    /// @notice Get the issuer of a token
    /// @param tokenId Identifier of the token
    /// @return Address who minted `tokenId`
    function issuerOf(uint256 tokenId) external view returns (address);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

##### Consensus

An interface allowing minting/revocation of tokens based on a consensus of a predefined set of addresses.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671Consensus.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671Consensus.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4671.sol";

interface IERC4671Consensus is IERC4671 {
    /// @notice Get voters addresses for this consensus contract
    /// @return Addresses of the voters
    function voters() external view returns (address[] memory);

    /// @notice Cast a vote to mint a token for a specific address
    /// @param owner Address for whom to mint the token
    function approveMint(address owner) external;

    /// @notice Cast a vote to revoke a specific token
    /// @param tokenId Identifier of the token to revoke
    function approveRevoke(uint256 tokenId) external;
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

##### Pull

An interface allowing a token owner to pull his token to a another of his wallets (here `recipient`). The caller must provide a signature of the tuple `(tokenId, owner, recipient)` using the `owner` wallet.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671Pull.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671Pull.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4671.sol";

interface IERC4671Pull is IERC4671 {
    /// @notice Pull a token from the owner wallet to the caller's wallet
    /// @param tokenId Identifier of the token to transfer
    /// @param owner Address that owns tokenId
    /// @param signature Signed data (tokenId, owner, recipient) by the owner of the token
    function pull(uint256 tokenId, address owner, bytes memory signature) external;
}
```
<!-- The below code snippet is automatically added from ./contracts/IERC4671Pull.sol -->
<!-- AUTO-GENERATED-CONTENT:END -->

### NTT Store

Non-tradable tokens are meant to be fetched by third-parties, which is why there needs to be a convenient way for users to expose some or all of their tokens. We achieve this result using a store which must implement the following interface.

<!-- AUTO-GENERATED-CONTENT:START (CODE:syntax=solidity&src=./contracts/IERC4671Store.sol) -->
<!-- The below code snippet is automatically added from ./contracts/IERC4671Store.sol -->
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IERC4671Store is IERC165 {
    // Event emitted when a IERC4671Enumerable contract is added to the owner's records
    event Added(address owner, address token);

    // Event emitted when a IERC4671Enumerable contract is removed from the owner's records
    event Removed(address owner, address token);

    /// @notice Add a IERC4671Enumerable contract address to the caller's record
    /// @param token Address of the IERC4671Enumerable contract to add
    function add(address token) external;

    /// @notice Remove a IERC4671Enumerable contract from the caller's record
    /// @param token Address of the IERC4671Enumerable contract to remove
    function remove(address token) external;

    /// @notice Get all the IERC4671Enumerable contracts for a given owner
    /// @param owner Address for which to retrieve the IERC4671Enumerable contracts
    function get(address owner) external view returns (address[] memory);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Rationale

### On-chain vs Off-chain

A decision was made to keep the data off-chain (via `tokenURI()`) for two main reasons: 
* Non-tradable tokens represent personal possessions. Therefore, there might be cases where the data should be encrypted. The standard should not outline decisions about encryption because there are just so many ways this could be done, and every possibility is specific to the use-case.
* Non-tradable tokens must stay generic. There could have been a possibility to make a `MetadataStore` holding the data of tokens in an elegant way, unfortunately we would have needed a support for generics in solidity (or struct inheritance), which is not available today.

## Reference Implementation

You can find an implementation of this standard in [../assets/eip-4671](https://github.com/ethereum/EIPs/tree/master/assets/eip-4671).

Using this implementation, this is how you would create a token:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC4671.sol";

contract EIPCreatorBadge is ERC4671 {
    constructor() ERC4671("EIP Creator Badge", "EIP") {}

    function giveThatManABadge(address owner) external {
        require(_isCreator(), "You must be the contract creator");
        _mint(owner);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://eips.ethereum.org/ntt/";
    }
}
```

This could be a contract managed by the Ethereum foundation and which allows them to deliver tokens to EIP creators.

## Security Considerations

One security aspect is related to the `tokenURI` method which returns the metadata linked to a token. Since the standard represents inherently personal possessions, users might want to encrypt the data in some cases e.g. national id cards. Moreover, it is the responsibility of the contract creator to make sure the URI returned by this method is available at all times.

The standard does not define any way to transfer a token from one wallet to another. Therefore, users must be very cautious with the wallet they use to receive these tokens. If a wallet is lost, the only way to get the tokens back is for the issuing authorities to deliver the tokens again, akin real life.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).