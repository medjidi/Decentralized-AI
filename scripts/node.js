require("hardhat");

async function main() {
  await hre.run("node");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});