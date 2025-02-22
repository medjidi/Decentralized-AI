// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LLMPlatform {
    // Структуры данных
    struct Miner {
        address wallet;
        bool isRegistered;
        uint256 totalRequests;
    }

    struct User {
        address wallet;
        bool isRegistered;
        uint256 totalPrompts;
    }

    struct Prompt {
        uint256 id;
        address sender;
        string content;
        uint256 timestamp;
    }

    // Хранилища
    mapping(address => Miner) public miners;
    mapping(address => User) public users;
    Prompt[] public prompts;
    uint256 public promptCount;

    // События
    event MinerRegistered(address indexed miner);
    event UserRegistered(address indexed user);
    event PromptSubmitted(uint256 indexed id, address indexed sender, string content);

    // Модификаторы
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    // Регистрация майнера
    function registerMiner() external {
        require(!miners[msg.sender].isRegistered, "Miner already registered");
        miners[msg.sender] = Miner(msg.sender, true, 0);
        emit MinerRegistered(msg.sender);
    }

    // Регистрация пользователя
    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(msg.sender, true, 0);
        emit UserRegistered(msg.sender);
    }

    // Отправка промпта
    function submitPrompt(string memory _content) external onlyRegisteredUser {
        prompts.push(Prompt(promptCount, msg.sender, _content, block.timestamp));
        users[msg.sender].totalPrompts++;
        emit PromptSubmitted(promptCount, msg.sender, _content);
        promptCount++;
    }

    // Получение промпта по ID
    function getPrompt(uint256 _id) public view returns (Prompt memory) {
        require(_id < promptCount, "Invalid prompt ID");
        return prompts[_id];
    }

    // Получение общего числа промптов
    function getTotalPrompts() public view returns (uint256) {
        return promptCount;
    }
}