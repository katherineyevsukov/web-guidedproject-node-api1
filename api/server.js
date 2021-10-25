// IMPORTS AT THE TOP
const express = require('express')
const Dog = require('./dog-model')
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE/ VERY IMPORTANT!!
server.use(express.json())
// ENDPOINTS
//start with edge cases and undesireable data

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
        console.log(error.message) // log statement!!
        res.status(500).json({ message: `Error! ${error.message}`})
    }
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', async (req, res) => {
    try {
      // pull that third segment of the path
      // because that is the id we need
      const { id } = req.params
      const dog = await Dog.findById(id)
      if (!dog) {
        res.status(404).json({ message: `dog ${id} not found`})
      } else {
        res.status(200).json(dog)
      }
    } catch (error) {
      res.status(500).json({ message: `Argh!!! ${error.message}`})
    }
  })

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)

server.post('/api/dogs', async (req, res) => {
    try {
      // 1- gather info from client
      const { name, weight } = req.body
      // 2- assume stuff is bad, handle
      if (!name || !weight) {
        res.status(422).json({ message: 'Dogs need name & weight' })
      } else {
        // 3- hit the db and send the stuff
        const dog = await Dog.create({ name, weight })
        res.status(201).json(dog)
      }
    } catch (error) {
      res.status(500).json({ message: `Argh!!! ${error.message}` })
    }
  })
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server



//nodemon restarts the server whenever we make changes