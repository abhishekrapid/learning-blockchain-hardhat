const hre = require("hardhat");

async function main() {
    const DoraToken = await hre.ethers.getContractFactory("Dora");
    const doraToken = await DoraToken.deploy(100000000, 50);

    await doraToken.deployed();

    console.log("Dora Token deployed: ", doraToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

