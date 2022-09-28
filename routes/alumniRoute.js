const express = require('express')
const { getAlumniUpdates, alumniAddUpdates, alumniDeleteUpdate, getAlumniUpdatesEdit, alumniUpdatesEdit } = require('../controllers/alumniUpdates')
const router=express.Router()

router
    .route('/')
    .get((req,res)=>{
        res.redirect('/alumni/updates')
    })
router  
    .route('/updates')
    .get(getAlumniUpdates)
    .post(alumniAddUpdates)

router
    .route('/updates/edit/:id')
    .get(getAlumniUpdatesEdit)
    .post(alumniUpdatesEdit)        

    

router  
    .route('/updates/delete/:id')
    .get(alumniDeleteUpdate)    


module.exports=router
