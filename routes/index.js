const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.json('welcome back-end')
})

module.exports = route