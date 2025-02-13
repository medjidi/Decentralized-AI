// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PromptContract {
    event MinerRegistered(address indexed miner);
    event UserRegistered(address indexed user);
    event PromptSent(string prompt);

    mapping(address => bool) public miners;
    mapping(address => bool) public users;

    function registerMiner(address _miner) public {
        miners[_miner] = true;
        emit MinerRegistered(_miner);
    }

    function registerUser(address _user) public {
        users[_user] = true;
        emit UserRegistered(_user);
    }

    function sendPrompt(string calldata _prompt) public {
        require(users[msg.sender], "Only registered users can send prompts");
        emit PromptSent(_prompt);
    }
}