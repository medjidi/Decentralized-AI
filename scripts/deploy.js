const hre = require("hardhat");

async function main() {
  // Получаем фабрику контракта
  const LLMPlatform = await hre.ethers.getContractFactory("LLMPlatform");

  // Деплоим контракт
  const contract = await LLMPlatform.deploy();

  // Ждем подтверждения деплоя (совместимый синтаксис для всех версий)
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });