const express = require('express')
const { home, AlumniUpdates, getEvents, getHappening, getNews } = require('../controllers/api')
const router=express.Router()


router
    .route('/home')
    .get(home)

router
    .route('/alumni') 
    .get(AlumniUpdates)  
    
router
    .route('/events') 
    .get(getEvents)

router  
    .route('/happening')
    .get(getHappening)

router  
    .route('/news')
    .get(getNews)    
    

    


module.exports=router