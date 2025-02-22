# Деплой смарт-контракта в сеть Avalanche Fuji

Документация по развертыванию и верификации смарт-контракта платформы для LLM.

## Ссылки
- **Контракт в Snowtrace**: [0x71D133F0CE3CD1a44abea1d372F24Eb1eb80F691](https://testnet.snowtrace.io/address/0x71D133F0CE3CD1a44abea1d372F24Eb1eb80F691)
- **Исходный код**: [LLMPlatform.sol](./contracts/LLMPlatform.sol)

## Предварительные требования
1. **Node.js** (v18+)
2. **npm** (v9+)
3. **MetaMask** с настроенной сетью Avalanche Fuji:
   - RPC URL: `https://api.avax-test.network/ext/bc/C/rpc`
   - Chain ID: `43113`
4. Тестовые токены AVAX (получить через [кран](https://faucet.avax.network/)).
## Установка
```bash
git clone https://github.com/your-username/llm-platform-contracts.git
cd llm-platform-contracts
npm install
```

## Настройка окружения
1. Создайте файл `.env` в корне проекта:
```env
PRIVATE_KEY="ВАШ_ПРИВАТНЫЙ_КЛЮЧ_МЕТАМАСК"
SNOWTRACE_API_KEY="ВАШ_API_КЛЮЧ"
```

2. Обновите `hardhat.config.js` (уже предварительно настроен):
```javascript
module.exports = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000
    }
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY
    }
  }
};
```

## Деплой контракта
```bash
# Компиляция
npx hardhat compile

# Запуск деплоя
npx hardhat run scripts/deploy.js --network fuji
```

После успешного выполнения вы увидите:
```
Contract deployed to: 0x71D133F0CE3CD1a44abea1d372F24Eb1eb80F691
```

## Верификация
```bash
npx hardhat verify --network fuji 0x71D133F0CE3CD1a44abea1d372F24Eb1eb80F691
```

## Тестирование
```bash
npx hardhat test
```

Пример теста:
```javascript
describe("LLMPlatform", function() {
  it("Should register user", async function() {
    await contract.registerUser();
    expect(await contract.users(owner.address)).to.have.property("isRegistered", true);
  });
});
```

## Структура проекта
```
.
├── contracts/
│   └── LLMPlatform.sol      # Основной контракт
├── scripts/
│   └── deploy.js            # Скрипт деплоя
├── test/
│   └── LLMPlatform.test.js  # Юнит-тесты
├── hardhat.config.js        # Конфигурация сети
└── .env                     # Переменные окружения
```

## Возможные ошибки
1. **Недостаток газа**:
   - Получите тестовые AVAX через кран.
   - Увеличьте `gasLimit` в конфиге.

2. **Ошибка верификации**:
   - Убедитесь, что версия компилятора и настройки `optimizer` совпадают.
   - Перекомпилируйте проект: `npx hardhat clean && compile`.

## Лицензия
MIT License. Подробнее в файле [LICENSE](./LICENSE).

---

**Автор**: Ваше Имя  
**Контакты**: [ваш.email@example.com](mailto:ваш.email@example.com)