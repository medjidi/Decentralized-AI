const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const PromptContract = await hre.ethers.getContractFactory("PromptContract");
    const deployedContract = await PromptContract.deploy();

    // Ожидание завершения деплоя
    await deployedContract.waitForDeployment();

    // Получение адреса контракта
    const contractAddress = deployedContract.target;

    // Вывод адреса в консоль
    console.log("Contract deployed to:", contractAddress);

    // Запись адреса контракта в .env
    if (contractAddress) {
        fs.appendFileSync('.env', `\nCONTRACT_ADDRESS=${contractAddress}`);
        console.log("Contract address saved to .env");
    } else {
        console.error("Failed to save contract address: contractAddress is undefined");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });