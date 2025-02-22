// test/TaskManager.test.mjs
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TaskManager", async function () {
  let TaskManager, taskManager;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Используем ethers из hardhat через import
    TaskManager = await ethers.getContractFactory("TaskManager");
    [owner, addr1, addr2] = await ethers.getSigners();
    taskManager = await TaskManager.deploy();
  });

  it("Should create a new task", async function () {
    await taskManager.createTask("Test Task");
    const task = await taskManager.tasks(1);
    expect(task.description).to.equal("Test Task");
  });

  it("Should complete a task", async function () {
    await taskManager.createTask("Test Task");
    await taskManager.completeTask(1);
    const task = await taskManager.tasks(1);
    expect(task.completed).to.equal(true);
  });

  it("Should check task owner", async function () {
    await taskManager.createTask("Another Test Task");
    const task = await taskManager.tasks(1);
    expect(task.owner).to.equal(owner.address);
  });
});