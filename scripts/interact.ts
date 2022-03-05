import { getContract, wallet } from "./utils"
import { ethers } from "ethers"

const contract = getContract("0x44222526B4aCfDaf979367C1Dbe148035F1403FF", "bin/EIPCreatorBadge.abi")

const tokenId = 1
const owner = "0x77aabF4893DDEA4f0AD14e26D9151c2940463bbF"
const recipient = "0xbD9baE0E5a75361e3D8F47Ec7C38271Ae5650BC2"

// const messageHash = ethers.utils.solidityKeccak256(["uint256", "address", "address"], [tokenId, owner, recipient])
// const messageHashBinary = ethers.utils.arrayify(messageHash)
// wallet.signMessage(messageHashBinary).then(console.log)

// contract.functions.pull(tokenId, owner, "...")
// .then(console.log)
// .catch(console.log)

contract.functions.name()
.then(console.log)
.catch(console.error)

contract.functions.symbol()
.then(console.log)
.catch(console.error)

contract.functions.total()
.then(console.log)
.catch(console.error)

// contract.functions.giveThatManABadge("0x77aabF4893DDEA4f0AD14e26D9151c2940463bbF")
// .then(console.log)
// .catch(console.error)

// contract.functions.balanceOf("0xbD9baE0E5a75361e3D8F47Ec7C38271Ae5650BC2")
// .then(console.log)
// .catch(console.error)

// contract.functions.tokenOfOwnerByIndex("0x77aabF4893DDEA4f0AD14e26D9151c2940463bbF", 1)
// .then(console.log)
// .catch(console.error)

// contract.functions.hasValid("0xbD9baE0E5a75361e3D8F47Ec7C38271Ae5650BC2")
// .then(console.log)
// .catch(console.error)