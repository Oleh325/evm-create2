import { expect } from "chai"
import { ethers } from "hardhat"
import { Deployer } from "../typechain-types"
import { keccak256 } from "ethers"
import bytecode from "../artifacts/contracts/Greeter.sol/Greeter.json"

describe("Deployer", function () {
    let deployer: Deployer

    beforeEach(async function () {
        const deployerFactory = await ethers.getContractFactory("Deployer")
        deployer = await deployerFactory.deploy()
        await deployer.waitForDeployment()
    })

    it("Should have the same precomputed addressess", async function () {
        const salt = keccak256(Uint8Array.from([0x12]))
        const precomputedAddress = await deployer.computeAddress(salt)
        const initCodeHash = keccak256(bytecode.bytecode)
        const ethersPrecomputedAddress = ethers.getCreate2Address(
            await deployer.getAddress(),
            salt,
            initCodeHash,
        )
        expect(precomputedAddress).to.equal(ethersPrecomputedAddress)
    })
})
