const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../../../backend/public')));

const DATA_FILE_PATH = path.join(__dirname, 'data/stocks.json');

stocksService.init(DATA_FILE_PATH);

app.use(express.json());

// Разрешаем CORS, чтобы фронтенд мог обращаться к серверу
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Запрос: ${req.method} ${req.url}`);
    next();
});

app.use('/stocks', stocksRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../../backend/public/index.html'));
});


app.listen(PORT, () => {
    console.log('------------------------------------------');
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log('------------------------------------------');
});
