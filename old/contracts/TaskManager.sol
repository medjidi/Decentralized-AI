// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint id;
        string description;
        address owner;
        bool completed;
    }

    uint public taskCount = 0;
    mapping(uint => Task) public tasks;

    event TaskCreated(uint id, string description, address owner);
    event TaskCompleted(uint id);

    function createTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, msg.sender, false);
        emit TaskCreated(taskCount, _description, msg.sender);
    }

    function completeTask(uint _id) public {
        Task memory _task = tasks[_id];
        require(_task.owner == msg.sender, "You are not the owner of this task");
        _task.completed = true;
        tasks[_id] = _task;
        emit TaskCompleted(_id);
    }
}