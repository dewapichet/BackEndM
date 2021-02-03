const express = require('express')
const route = express.Router()

const UserController = require('../controller/UserController')

route.post('/login', UserController.login)

route.post('/register', UserController.register)

route.get('/profile/:id', UserController.profile)

module.exports = route