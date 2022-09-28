const express = require('express')
const { hodEvents, getHodUploadEvents, hodUploadEvents, getHodUpdateEvents, hodUpdatEevents, hodDeleteEvents } = require('../controllers/hodEvents')
const router=express.Router()


router
    .route('/')
    .get((req,res)=>{
        res.redirect('/hod/events')
    })

router  
    .route('/events')
    .get(hodEvents)

router
    .route('/events/upload')
    .get(getHodUploadEvents)
    .post(hodUploadEvents)    

router
    .route('/events/update/:id')
    .get(getHodUpdateEvents)    
    .post(hodUpdatEevents)

router
    .route('/events/delete/:id')
    .get(hodDeleteEvents)

module.exports=router

