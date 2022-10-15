const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

//Note: The smart contract was compiled seperately, it can be compiled in code w/ solcjs
async function main() {
    // Connecting to my ganache local blockchain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    const wallet = new ethers.Wallet(process.env.PK, provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`)

    const transactionResponse = await contract.store("23")
    const transactionReceipt = await transactionResponse.wait(1)
    const newFavoriteNumber = await contract.retrieve()
    console.log(`New favorite number: ${newFavoriteNumber.toString()}`)
}

// Main function is asynchronous. The .then... is waiting for it to finish then printing any errors that occur
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
