const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let displayData = {
    name1: "Игрок 1",
    points1: 0,
    team1: "БЕЛЫЙ",
    name2: "Игрок 2",
    points2: 0,
    team2: "КРАСНЫЙ",
    showWinner: false,
    winnerName: "",
    page: "index",   // "index" или "wheel"
    spin: false      // флаг крутки колеса
};

// Получить состояние дисплея
app.get('/data', (req, res) => {
    res.json(displayData);
});

// Обновить данные с панели
app.post('/data', (req, res) => {
    displayData = { ...displayData, ...req.body };
    res.json({ status: "ok", displayData });
});

// Обновить победителя
app.post('/winner', (req, res) => {
    displayData.showWinner = true;
    displayData.winnerName = req.body.winnerName || "";
    res.json({ status: "ok", displayData });
});

// Обновить страницу
app.post('/page', (req, res) => {
    displayData.page = req.body.page || "index";
    res.json({ status: "ok", displayData });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
