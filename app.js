const express = require('express')
const app = express();

const users = require("./routes/users.js")

app.use('/',users)

app.listen(5000)