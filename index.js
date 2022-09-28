require('dotenv').config()
const express = require('express')
const app=express()
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const cloudinary=require('cloudinary').v2


const connectDb=require('./config/database')
connectDb()


app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


cloudinary.config({ 
    cloud_name: 'dhgm7jddl', 
    api_key: '474728255221195', 
    api_secret: '5LcuEqO6E1ILH_JsZP4DQIFaGhk' 
});

const homeRoute=require('./routes/homeRoute')
const alumniRoute=require('./routes/alumniRoute')
const adminRoute=require('./routes/adminRoute')
const hodRoute=require('./routes/hodRoute')
let apiRoute=require('./routes/apiRoute')
const { isLoggedin, isHod, isAlumni, isAdmin } = require('./middlewares/user')

app.use('/',homeRoute)
app.use('/admin',isLoggedin,isAdmin,adminRoute)
app.use('/hod',isLoggedin,isHod,hodRoute)
app.use('/alumni',isLoggedin,isAlumni,alumniRoute)
app.use('/api',apiRoute)
app.get('*',(req,res)=>{
    res.render('404')
})


app.listen(process.env.PORT,()=>{
    console.log('connected on 5000');
})
