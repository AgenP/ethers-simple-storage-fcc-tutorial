const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const wallet = new ethers.Wallet(process.env.PK)
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PK_PASS,
        process.env.PK
    )
    console.log(encryptedJsonKey)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
