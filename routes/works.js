const express = require('express')
const route = require("express").Router();
const {createWork,showWork,updateDetail,Delete} = require("../controller/WorkController");
const passport = require('../middleware/passport')
//add work 
route.post('/add-work',createWork)


//Show work 
route.get('/show-work/:id',[passport.isLogin],showWork)


//Delete work
route.delete('/delete-work/:id',Delete)

//Update detail in work
route.put('/:id',updateDetail)


module.exports = route;