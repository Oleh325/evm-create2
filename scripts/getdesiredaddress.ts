import { ethers, run } from "hardhat"
import { keccak256 } from "ethers"

const main = async () => {
    await run("compile")

    const deployerFactory = await ethers.getContractFactory(`Deployer`)
    const deployer = await deployerFactory.deploy()
    await deployer.waitForDeployment()

    let i = 0x0
    let address: string

    while (true) {
        const salt = keccak256(Uint8Array.from([i]))
        address = await deployer.computeAddress(salt)
        console.log(`Current address is: ${address}`)
        if (address.slice(40, 42) === "69") {
            break
        }
        i++
    }
    console.log(`Got the contract with the address: ${address} and the salt: ${i}`)
    console.log("Nice!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
