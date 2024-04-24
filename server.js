require('dotenv').config();
const express = require("express");
const http = require("http");

const { fireAPIRequest } = require("./server-logic")


const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("App route");
    console.log("App route");
});

app.get("/keep-alive", (req, res) => {
    res.send("Alive {200}!");
    console.log("=======>>>>THE SERVER WAS PINGED");
});

function pingKeepAlive() {
    const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL
    const server_url = KEEP_ALIVE_URL + ":" + PORT + "/keep-alive";
    http.get(server_url, (res) => {
    });
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    fireAPIRequest();
    setInterval(pingKeepAlive, 5000);
});
