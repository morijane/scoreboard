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
    page: ""
};

app.get('/data', (req, res) => {
    res.json(displayData);
});

app.post('/data', (req, res) => {
    displayData = { ...displayData, ...req.body };
    res.json({ status: "ok", displayData });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});