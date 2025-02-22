async function main() {
    const { ethers } = require("hardhat");
  
    // Получаем фабрику контракта TaskManager
    const TaskManager = await ethers.getContractFactory("TaskManager");
    
    // Развертываем контракт
    const taskManager = await TaskManager.deploy();
  
    console.log("TaskManager deployed to:", taskManager.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });