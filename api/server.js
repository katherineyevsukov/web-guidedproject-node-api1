// IMPORTS AT THE TOP
const express = require('express')
const Dog = require('./dog-model')
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE/ VERY IMPORTANT!!
server.use(express.json())
// ENDPOINTS

// [GET] / (Hello World endpoint)
//req(represents request from client)
//res(the response we put together)
server.get('/', (req, res) => {
    res.json({ message: 'hello, world' })
})
// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await Dog.findAll() //trip to db using an async helper function, db operations are always async
        res.status(200).json(dogs)
        // throw new Error('ERROR FETCHING DOGS!')
    } catch (error) {
        res.status(500).json({ message: `Error! ${error.message}`})
    }
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server

//nodemon restarts the server whenever we make changes