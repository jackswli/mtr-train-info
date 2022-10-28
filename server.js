const express = require("express");
const cors = require("cors");
const app = express();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

    {line: "TML", sta: "WKS", description: "Wu Kai Sha"},    
    {line: "TML", sta: "MOS", description: "Ma On Shan"},
    {line: "TML", sta: "HEO", description: "Heng On"},
    {line: "TML", sta: "TSH", description: "Tai Shui Hang"},
    {line: "TML", sta: "SHM", description: "Shek Mun"},
    {line: "TML", sta: "CIO", description: "City One"},
    {line: "TML", sta: "STW", description: "Sha Tin Wai"},
    {line: "TML", sta: "CKT", description: "Che Kung Temple"},
    {line: "TML", sta: "TAW", description: "Tai Wai"},
    {line: "TML", sta: "HIK", description: "Hin Keng"},
    {line: "TML", sta: "DIH", description: "Diamond Hill"},
    {line: "TML", sta: "KAT", description: "Kai Tak"},
    {line: "TML", sta: "SUW", description: "Sung Wong Toi"},
    {line: "TML", sta: "TKW", description: "To Kwa Wan"},
    {line: "TML", sta: "HOM", description: "Ho Man Tin"},
    {line: "TML", sta: "HUH", description: "Hung Hom"},
    {line: "TML", sta: "ETS", description: "East Tsim Sha Tsui"},
    {line: "TML", sta: "AUS", description: "Austin"},
    {line: "TML", sta: "NAC", description: "Nam Cheong"},
    {line: "TML", sta: "MEF", description: "Mei Foo"},
    {line: "TML", sta: "TWW", description: "Tsuen Wan West"},
    {line: "TML", sta: "KSR", description: "Kam Sheung Road"},
    {line: "TML", sta: "YUL", description: "Yuen Long"},
    {line: "TML", sta: "LOP", description: "Long Ping"},
    {line: "TML", sta: "TIS", description: "Tin Shui Wai"},
    {line: "TML", sta: "SIH", description: "Siu Hong"},
    {line: "TML", sta: "TUM", description: "Tuen Mun"},

    {line: "EAL", sta: "ADM", description: "Admiralty"},
    {line: "EAL", sta: "EXC", description: "Exhibition Centre"},
    {line: "EAL", sta: "HUH", description: "Hung Hom"},
    {line: "EAL", sta: "MKK", description: "Mong Kok East"},
    {line: "EAL", sta: "KOT", description: "Kowloon Tong"},
    {line: "EAL", sta: "TAW", description: "Tai Wai"},
    {line: "EAL", sta: "SHT", description: "Sha Tin"},
    {line: "EAL", sta: "FOT", description: "Fo Tan"},
    {line: "EAL", sta: "RAC", description: "Racecourse"},
    {line: "EAL", sta: "UNI", description: "University"},
    {line: "EAL", sta: "TAP", description: "Tai Po Market"},
    {line: "EAL", sta: "TWO", description: "Tai Wo"},
    {line: "EAL", sta: "FAN", description: "Fanling"},
    {line: "EAL", sta: "SHS", description: "Sheung Shui"},
    {line: "EAL", sta: "LOW", description: "Lo Wu"},
    {line: "EAL", sta: "LMC", description: "Lok Ma Chau"},
];

function getRandomStation() {
    return sta[Math.floor(Math.random() * sta.length)];
}

app.get("/mtr", function (req, res) {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    setInterval(async () => {
        let s = getRandomStation();
        let data = await fetch("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line="+s.line+"&sta="+s.sta)
            .then(response => {return response.json();})
            .then(data => {return data;});
        console.log(data);
        res.write("data:" + JSON.stringify(data));
        res.write("\n\n");
    }, 10000);
  });
  
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