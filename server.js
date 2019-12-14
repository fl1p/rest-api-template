const express = require('express');
const body_parser = require('body-parser');

let data = require('./data')
const server = express();
const port = 4000;

server.use(body_parser.json());

// GET ALL ITEMS
server.get('/items', (req, res) => {
    res.json(data);
});

// GET ITEM BY ID
server.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.json({ message: `item ${itemId} doesn't exist` })
    }
});

// CREATE
server.post('/items', (req, res) => {
    const item = req.body;
    console.log('Adding new item: ', item);

    data.push(item)
    res.json(data);
});

// UPDATE
server.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);

    const updatedListItems = [];
    data.forEach(oldItem => {
        if (oldItem.id === itemId) {
            updatedListItems.push(item);
        } else {
            updatedListItems.push(oldItem);
        }
    });

    data = updatedListItems;

    res.json(data);
});

// DELETE
server.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;

    console.log("Delete item with id: ", itemId);

    // filter list copy, by excluding item to delete
    const filtered_list = data.filter(item => item.id !== itemId);

    // replace old list with new one
    data = filtered_list;

    res.json(data);
});


// START SERVER
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});