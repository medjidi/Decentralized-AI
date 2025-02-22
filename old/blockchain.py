import hashlib
import time
from flask import Flask, jsonify, request
import json

# Определяем класс Block для представления отдельных блоков в блокчейне
class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash):
        self.index = index  # Индекс блока в цепочке
        self.previous_hash = previous_hash  # Хэш предыдущего блока
        self.timestamp = timestamp  # Временная метка блока
        self.data = data  # Данные (транзакции) в блоке
        self.hash = hash  # Хэш текущего блока

    # Статический метод для расчета хэша блока на основе его данных
    @staticmethod
    def calculate_hash(index, previous_hash, timestamp, data):
        # Создаем строку из всех параметров для хэширования
        value = str(index) + str(previous_hash) + str(timestamp) + json.dumps(data)
        return hashlib.sha256(value.encode()).hexdigest()  # Возвращаем хэш SHA-256

# Определяем класс Blockchain для управления цепочкой блоков
class Blockchain:
    def __init__(self):
        self.chain = []  # Инициализация цепочки блоков
        self.current_transactions = []  # Инициализация списка текущих транзакций
        # Создаем первый блок, обозначенный как генезис-блок
        self.create_block(previous_hash='1', proof=100)

    # Метод для создания нового блока
    def create_block(self, proof, previous_hash=None):
        # Создаем новый блок с указанными параметрами
        block = Block(
            index=len(self.chain) + 1,  # Уникальный индекс для блока
            previous_hash=previous_hash,  # Хэш предыдущего блока
            timestamp=time.time(),  # Текущая временная метка
            data=self.current_transactions,  # Текущие транзакции
            hash=self.calculate_hash(len(self.chain) + 1, previous_hash, time.time(), self.current_transactions)  # Хэш нового блока
        )
        self.current_transactions = []  # Очищаем текущие транзакции после создания блока
        self.chain.append(block)  # Добавляем новый блок в цепочку
        return block  # Возвращаем созданный блок

    # Статический метод для расчета хэша блока
    @staticmethod
    def calculate_hash(index, previous_hash, timestamp, data):
        # Создаем строку из всех параметров для хэширования
        value = str(index) + str(previous_hash) + str(timestamp) + json.dumps(data)
        return hashlib.sha256(value.encode()).hexdigest()  # Возвращаем хэш SHA-256

    def add_transaction(self, sender, receiver, amount):
        self.current_transactions.append({
            'sender': sender,
            'receiver': receiver,
            'amount': amount
        })
        return self.last_block.index + 1

    @property
    def last_block(self):
        return self.chain[-1]

app = Flask(__name__) # Инициализируем Flask приложение
blockchain = Blockchain() # Инициализируем блокчейн

# Эндпоинт для майнинга нового блока
@app.route('/mine', methods=['GET'])
def mine():
    last_block = blockchain.last_block # Получаем последний блок из блокчейна
    proof = 100  # Здесь должна быть реализация доказательства работы (proof of work)
    previous_hash = last_block.hash # Получаем хэш предыдущего блока
    block = blockchain.create_block(proof, previous_hash) # Создаем новый блок
    response = { # Формируем JSON ответ
        'index': block.index,
        'timestamp': block.timestamp,
        'transactions': block.data,
        'previous_hash': block.previous_hash,
        'hash': block.hash
    }
    return jsonify(response), 200 # Возвращаем JSON ответ с кодом 200 (OK)

# Эндпоинт для добавления новой транзакции
@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json() # Получаем данные транзакции из JSON запроса
    required = ['sender', 'receiver', 'amount'] # Список необходимых полей

    if not all(k in values for k in required): # Проверяем, есть ли все необходимые поля в запросе
        return 'Missing values', 400 # Если нет, то возвращаем сообщение об ошибке с кодом 400 (Bad Request)

    index = blockchain.add_transaction(values['sender'], values['receiver'], values['amount']) # Добавляем транзакцию в блокчейн
    response = {'message': f'Transaction will be added to Block {index}'} # Формируем JSON ответ
    return jsonify(response), 201 # Возвращаем JSON ответ с кодом 201 (Created)

# Эндпоинт для просмотра всего блокчейна
@app.route('/chain', methods=['GET'])
def full_chain():
    chain = [] # Инициализируем пустой список
    for block in blockchain.chain: # Перебираем все блоки из блокчейна
        chain.append({ # Добавляем информацию о каждом блоке в список
            'index': block.index,
            'previous_hash': block.previous_hash,
            'timestamp': block.timestamp,
            'transactions': block.data,
            'hash': block.hash
        })
    response = { # Формируем JSON ответ
        'length': len(chain), # Количество блоков в блокчейне
        'chain': chain # Цепочка блоков
    }
    return jsonify(response), 200 # Возвращаем JSON ответ с кодом 200 (OK)

if __name__ == '__main__': # Запускаем приложение, если скрипт запущен напрямую
    app.run(host='0.0.0.0', port=5000) # Запускаем Flask сервер на всех доступных интерфейсах, порт 5000