const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LLMPlatform", function () {
  let contract;

  before(async () => {
    const LLMPlatform = await ethers.getContractFactory("LLMPlatform");
    contract = await LLMPlatform.deploy();
  });

  it("Should register a user", async () => {
    const [owner] = await ethers.getSigners();
    await contract.registerUser();
    const user = await contract.users(owner.address);
    expect(user.isRegistered).to.equal(true);
  });
});