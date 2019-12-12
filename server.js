const express = require('express');
const server = express();

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.get("/json", (req, res) => {
    res.json({ message: "Hello world" });
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});