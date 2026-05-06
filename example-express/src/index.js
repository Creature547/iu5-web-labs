const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/stocks.json');

stocksService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Запрос: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #2c3e50;">Сервер Anya (Лабораторная №4) запущен!</h1>
            <p style="font-size: 1.2em;">Данные для Variant 4 доступны здесь:</p>
            <a href="/stocks" style="display: inline-block; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px;">Посмотреть список акций</a>
        </div>
    `);
});


app.use('/stocks', stocksRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден. Проверьте URL!' });
});

app.listen(PORT, () => {
    console.log('------------------------------------------');
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log('------------------------------------------');
});
