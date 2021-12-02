const express = require("express");
const app = express();
const server = require("http").createServer(app);

const path = require("path");

const PORT = 3000;
const HOSTNAME = "localhost";

server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening at http://${HOSTNAME}:${PORT}`);
})

app.use(express.static('public'));

const options = {
    root: path.join(__dirname, "./public/html")
}

app.get("/", (req, res) => {
    res.sendFile("index.html", options);
});