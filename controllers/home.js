let User=require('../models/User')
let cookieToken=require('../utils/cookieToken')
const jwt=require('jsonwebtoken')


exports.getLogin=(req,res)=>{
    res.render('login')
}
exports.login=async (req,res)=>{
    const {username,password} = req.body
    let user=await User.findOne({username:username}).select('+password')
    if(!user){
        return res.redirect('/login')
    }
    let isPasswordCorrect=await user.isValidatedPassword(password)
    if(!isPasswordCorrect){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}
exports.getRegister=async(req,res)=>{
    res.render('register')
 
}
exports.register=async(req,res)=>{
    let {username,password,department}=req.body
    await User.create({id:Date.now(),username:username,password:password,department:department})
    res.redirect('/login')
}

exports.logout = async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/')
}

exports.adminHome=async(req,res)=>{
    res.render('home')
}