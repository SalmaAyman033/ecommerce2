const express = require('express');
const router = express.Router();
const User =require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.get('/login',(req,res)=>{
    res.render("login.ejs");
})
router.get('/register',(req,res)=>{
    res.render("register.ejs");
})
// getting all the users without their password hash
router.get('/',async(req,res)=>{
    //res.render("login",{title:"login system"});
    const userList = await User.find().select('-passwordHash');
    if(!userList){
        return res.status(500).json({success:false});
    }
    res.send(userList);
});
//getting one user
router.get('/:id',async (req,res)=>{
    const user =await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        res.status(500).json({success:false})
    }
    res.send(user);
})
//login a user Api
router.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    require('dotenv').config()
    const secret = process.env.SECRET;
    if(!user){
        return res.status(400).send("the user not found");
    }
    if(user && bcrypt.compareSync(req.body.passwordHash,user.passwordHash)){
        const token = jwt.sign({
            isAdmin : user.isAdmin,
            email:user.email
        },
        secret,  //secret is like a password which we used to create web tokens
        {expiresIn:'1d'}
    )
        res.cookie('jwt',token);    
        res.status(200).json({user:user._id,name:user.name});
    }
    else{
        return res.status(400).send("password is wrong");
    }
})

router.post('/process_login', async (req, res) => {
    return res.redirect('/api/v1/user/login');
})

//post/register a new user.
router.post('/register', async (req,res)=>{
    console.log(req.body);
    let newuser = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:req.body.passwordHash,  //bcrypt.hashSync(req.body.passwordHash,10)
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })
    newuser = await newuser.save();
    if(!newuser){
        return res.status(404).send('the user cant be created')
    }
    res.status(200);
    res.redirect('/api/v1/user/login');
})
router.get('/',async (req,res)=>{
    const user =await User.find();
    if(!user){
        res.status(500).json({success:false})
    }
    res.send(user);
})
module.exports = router;