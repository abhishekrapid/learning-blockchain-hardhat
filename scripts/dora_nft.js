const hre = require("hardhat");

async function main() {
    const DoraNFTToken = await hre.ethers.getContractFactory("DORANFT");
    const doraNFTToken = await DoraNFTToken.deploy();

    await doraNFTToken.deployed();

    console.log("Dora Token deployed: ", doraNFTToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

