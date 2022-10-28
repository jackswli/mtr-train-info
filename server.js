/*server.js*/
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

const line = [
    {code: "AEL", description: "Airport Express"},
    {code: "TCL", description: "Tung Chung Line"},
    {code: "TML", description: "Tuen Ma Line"},
    {code: "TKL", description: "Tseung Kwan O Line"},
    {code: "EAL", description: "East Rail Line"},
];

const sta = [
    {line: "AEL", sta: "HOK", description: "Hong Kong"},
    {line: "AEL", sta: "KOW", description: "Kowloon"},
    {line: "AEL", sta: "TSY", description: "Tsing Yi"},
    {line: "AEL", sta: "AIR", description: "Airport"},
    {line: "AEL", sta: "AWE", description: "AsiaWorld Expo"},
    {line: "TCL", sta: "HOK", description: "Hong Kong"},
    {line: "TCL", sta: "KOW", description: "Kowloon"},
    {line: "TCL", sta: "OLY", description: "Olympic"},
    {line: "TCL", sta: "NAC", description: "Nam Cheong"},
    {line: "TCL", sta: "LAK", description: "Lai King"},
    {line: "TCL", sta: "TSY", description: "Tsing Yi"},
    {line: "TCL", sta: "SUN", description: "Sunny Bay"},
    {line: "TCL", sta: "TUC", description: "Tung Chung"},
    {line: "TKL", sta: "NOP", description: "North Point"},
    {line: "TKL", sta: "QUB", description: "Quarry Bay"},
    {line: "TKL", sta: "YAT", description: "Yau Tong"},
    {line: "TKL", sta: "TIK", description: "Tiu Keng Leng"},
    {line: "TKL", sta: "TKO", description: "Tseung Kwan O"},
    {line: "TKL", sta: "LHP", description: "LOHAS Park"},
    {line: "TKL", sta: "HAH", description: "Hang Hau"},
    {line: "TKL", sta: "POA", description: "Po Lam"},
];


const stocks = [
  { id: 1, ticker: "AAPL", price: 497.48 },
  { id: 2, ticker: "MSFT", price: 213.02 },
  { id: 3, ticker: "AMZN", price: 3284.72 },
];

function getRandomStock() {
  return Math.round(Math.random() * (2 - 0) + 0);
}

function getRandomPrice() {
  return Math.random() * (5000 - 20) + 20;
}

app.get("/stocks", function (req, res) {
  res.status(200).json({ success: true, data: stocks });
});

app.get("/realtime-price", function (req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(() => {
    res.write("data:" + JSON.stringify({ ...stocks[getRandomStock()], price: getRandomPrice() }));
    res.write("\n\n");
  }, 10000);
});

app.listen(PORT, function () {console.log(`Server is running on ${PORT}`);});