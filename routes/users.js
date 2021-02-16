const express = require('express')
const route = require("express").Router();
const {registerUsers,userLogin,get_profile} = require ("../controller/UserController")
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const passport = require('../middleware/passport')

//User Register Route
route.post('/register-user' ,[
    body('first_name').not().notEmpty().withMessage('กรุณากรอกชื่อ'),
    body('last_name').not().notEmpty().withMessage('กรุณากรอกนามสกุล'),
    body('tel').isLength({min:10,max:10}).withMessage('เบอร์โทรไม่ถูกต้อง').not().notEmpty().withMessage('กรุณากรอกเบอร์โทร'),
    body('user_name').isLength({min:6,max:10}).withMessage('ความยาวตั้งแต่ 6-8 ตัว').not().notEmpty().withMessage('กรุณากรอกusername'),
    body('password').isLength({min:6,max:10}).withMessage('ความยาวตั้งแต่ 6-8 ตัว').not().notEmpty().withMessage('กรุณากรอกpassword')
], async (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({error : errors.array()});    
    }
    await registerUsers(req.body,"user",res);
})


//Mec Register Route
route.post('/register-mec' ,[
    body('first_name').not().notEmpty().withMessage('กรุณากรอกชื่อ'),
    body('last_name').not().notEmpty().withMessage('กรุณากรอกนามสกุล'),
    body('code_id').isLength({min:13,max:13}).withMessage('เลขประจำตัวประชาชนไม่ถูกต้อง').not().notEmpty().withMessage('กรุณากรอกเลขประจำตัวประชาชน'),
    body('tel').isLength({min:10,max:10}).withMessage('เบอร์โทรไม่ถูกต้อง').not().notEmpty().withMessage('กรุณากรอกเบอร์โทร'),
    body('address').not().notEmpty().withMessage('กรุณากรอกที่อยู่'),
    body('user_name').isLength({min:6,max:10}).withMessage('ความยาวตั้งแต่ 6-8 ตัว').not().notEmpty().withMessage('กรุณากรอกusername'),
    body('password').isLength({min:6,max:10}).withMessage('ความยาวตั้งแต่ 6-8 ตัว').not().notEmpty().withMessage('กรุณากรอกpassword')
], async (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({error : errors.array()});    
    }
    await registerUsers(req.body,"mec",res);
})


//User,Mec Login Route
route.post("/login", async (req, res) => {
    await userLogin(req.body, "user,mec", res);
  });


//Profile 
route.get('/profile/:id', [passport.isLogin],get_profile)


//logout
route.get('/logout',function(req, res, next){
    req.logOut();

    req.session = null;

    res.redirect('/');
})
module.exports = route