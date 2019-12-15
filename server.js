const express = require('express')
const body_parser = require('body-parser')

const server = express()
const port = 4000

const db = require("./db")
const dbName = "rep"
const collectionName = "items"

db.initialize(dbName, collectionName, function (dbCollection) {

    // connect to items collection
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
    })

    // *****
    // CRUD
    // *****

    // GET ALL ITEMS
    server.get("/items", (req, res) => {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error
            res.json(result)
        })
    })


    // GET ITEM BY ID
    server.get("/items/:id", (req, res) => {
        const itemId = req.params.id

        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error
            res.json(result)
        })
    })


    // CREATE
    server.post("/items", (req, res) => {
        const item = req.body
        dbCollection.insertOne(item, (error, result) => {
            if (error) throw error

            dbCollection.find().toArray((_error, _result) => {
                if (_error) throw _error
                res.json(_result)
            })
        })
    })


    // UPDATE
    server.put("/items/:id", (req, res) => {
        const itemId = req.params.id
        const item = req.body
        console.log("Editing item: ", itemId, " to be ", item)

        dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error

            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error
                res.json(_result)
            })
        })
    })


    // DELETE
    server.delete("/items/:id", (req, res) => {
        const itemId = req.params.id
        console.log("Delete item with id: ", itemId)

        dbCollection.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error

            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error
                res.json(_result)
            })
        })
    })
}, function (err) {
    throw (err)
})

// MIDDLEWAREZ
server.use(body_parser.json())


// START SERVER
server.listen(port, () => {
    console.log(`Server listening at ${port}`)
})
