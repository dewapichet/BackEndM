const express = require('express')
const app = express()
const cors = require('cors')
const body = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose');
const passport = require('passport')


mongoose.connect('mongodb://localhost:27017/Mec', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});


app.use(cors())
app.use(body())
app.use(passport.initialize());

const index = require('./routes/index')
const users = require('./routes/users')
const works = require('./routes/works')

app.use('/', index);
app.use('/users', users);
app.use('/works',works);



app.listen(process.env.PORT_SERVE, () => console.log(`start: ${process.env.PORT_SERVE}`))