const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // раздаём все файлы в текущей папке

// начальное состояние дисплея
let displayData = {
    name1: "Игрок 1",
    points1: 0,
    team1: "БЕЛЫЙ",
    name2: "Игрок 2",
    points2: 0,
    team2: "КРАСНЫЙ",
    showWinner: false,
    winnerName: "",
    page: "index" // по умолчанию показываем index.html
};

// получаем текущее состояние (для дисплея или wheel)
app.get('/data', (req, res) => {
    res.json(displayData);
});

// обновляем состояние с панели управления
app.post('/data', (req, res) => {
    displayData = { ...displayData, ...req.body };
    res.json({ status: "ok", displayData });
});

// отдельный эндпоинт для смены страницы
app.post('/page', (req, res) => {
    if(req.body.page) {
        displayData.page = req.body.page;
        res.json({ status: "ok", page: displayData.page });
    } else {
        res.status(400).json({ status: "error", message: "No page provided" });
    }
});

// отдельный эндпоинт для объявления победителя
app.post('/winner', (req, res) => {
    if(req.body.winnerName) {
        displayData.showWinner = true;
        displayData.winnerName = req.body.winnerName;
        res.json({ status: "ok", winnerName: displayData.winnerName });
    } else {
        res.status(400).json({ status: "error", message: "No winnerName provided" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
