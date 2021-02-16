const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('../middleware/passport')
require('dotenv').config();

const registerUsers = async(req,role,res) => {
        
        const validateUsername = async user_name => {
            let user = await User.findOne({ user_name });
            return user ? false : true;
        };
        const validateTel = async tel => {
            let user = await User.findOne({ tel });
            return user ? false : true;
        };
        const validateCodeId = async code_id => {
            let user = await User.findOne({ code_id });
            return user ? false : true;
        };
        
        //CheckUsernameRepeatedly
        let usernameTaken = await validateUsername(req.user_name);
        if(!usernameTaken){
            res.json("Username มีผู้ใช้แล้ว")
        }
        //CheckTelRepeatedly
        let telTaken = await validateTel(req.tel);
        if(!telTaken){
            res.json("เบอร์โทรนี้มีผู้ใช้งานแล้ว")
        }
        //CheckCodeIdRepeatedly
        let codeIdTaken = await validateCodeId(req.code_id);
        if(!codeIdTaken){
            res.json("เลขประจำตัวประชาชนมีผู้ใช้แล้ว")
        }else if (req.password !== req.confirmPassword) {
            res.json("Passwords do not match");
        }else{
            const salt = await bcrypt.genSalt(6);
            const hash = await bcrypt.hash(req.password, salt);
            const newUser = new User({
                ...req,
                password : hash,
                role
            });

            await newUser.save();
            res.json("ลงทะเบียนสำเร็จ");
        }
        
    }

const userLogin = async(userCred,role,res)=>{
    let {user_name,password} = userCred;
    //Check Username 
    const user = await User.findOne({user_name});
    if (!user){
        res.json("Username and Password Wrong")
    }
    let pass = await bcrypt.compare(password, user.password);
    if(pass){
        let token = jwt.sign({
            user_id : user._id,
            role : user.role,
            username : user.user_name
        },process.env.JWT_SECRET,
        {expiresIn : "7 days"}
        );
        const expires_in = jwt.decode(token);
        let result = {
            user_id : user._id,
            username : user.user_name,
            role : user.role,
            tokenType : "Bearer",
            token : token,
            expires_in : expires_in.exp
        }
        res.json({...result,
            message : "Login Success"
        })
    }else{
        res.json("Username and Password Wrong")
    }
    
}

const get_profile = async (req, res) => {
    const { id } = req.params;
    const users = await User.findOne({ _id: id });
    res.json(users)
}

4r   

    


    
    
    





    
    
