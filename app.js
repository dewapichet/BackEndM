const express = require('express')
const app = express()
const cors = require('cors')
const body = require('body-parser')
require('dotenv').config()

const index = require('./routes/index')
const users = require('./routes/users')

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/admin', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });

mongoose.connect(`mongodb://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}@${process.env.HOST_MONGODB}:${process.env.PORT_MONGODB}/${process.env.DATABASE_MONGODB}`, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
});


app.use(cors())
app.use(body())

app.use('/', index)
app.use('/users', users)

app.listen(process.env.PORT_SERVE, () => console.log(`start: ${process.env.PORT_SERVE}`))