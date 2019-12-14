const express = require('express')
const body_parser = require('body-parser')

// let data = require('./data')
const server = express()
const port = 4000

// diskdb connection
const db = require('diskdb')
db.connect('./data', ['items'])


server.use(body_parser.json())

// GET ALL ITEMS
server.get('/items', (req, res) => {
    res.json(db.items.find())
})

// GET ITEM BY ID
server.get('/items/:id', (req, res) => {
    const itemId = req.params.id
    const item = db.items.find({ id:itemId })

    if (item) {
        res.json(item)
    } else {
        res.json({ message: `item ${itemId} doesn't exist` })
    }
})

// CREATE
server.post('/items', (req, res) => {
    const item = req.body
    console.log('Adding new item: ', item)
    // add new
    db.items.save(item)
    // return updated list
    res.json(db.items.find())
})

// UPDATE
server.put('/items/:id', (req, res) => {
    const itemId = req.params.id
    const item = req.body
    console.log("Editing item: ", itemId, " to be ", item)

    db.items.update({id: itemId}, item)

    res.json(db.items.find())
})

// DELETE
server.delete('/items/:id', (req, res) => {
    const itemId = req.params.id

    console.log("Delete item with id: ", itemId);

    db.items.remove({ _id: itemId })

    res.json(db.items.find());
});


// START SERVER
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
