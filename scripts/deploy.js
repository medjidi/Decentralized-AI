async function main() {
    const LLMPlatform = await ethers.getContractFactory("LLMPlatform");
    const contract = await LLMPlatform.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });