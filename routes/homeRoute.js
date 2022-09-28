const express = require('express')
const { getLogin, login, getRegister, register, logout } = require('../controllers/home')
const { isLoggedin, ifLoggedin } = require('../middlewares/user')
const router=express.Router()

router
    .route('/')
    .get((req,res)=>{
        res.redirect('/login')
    })

router
    .route('/login')
    .get(ifLoggedin,getLogin)
    .post(ifLoggedin,login)
    
router
    .route('/register')
    .get(getRegister)
    .post(register)  
    
router
    .route('/logout')
    .get(logout) 

module.exports=router

