const express = require('express')
const { adminEvents, adminApproveEvents, adminUploadEvents, adminDeleteEvents, adminUpdateEvents, EventsChangeStatus, adminMakeApproveEvents, getAdminEventsUpload, getAdminUpdateEvents, adminDeleteApproveEvents } = require('../controllers/adminEvents')
const { adminHappening, adminHappeningUpload, adminDeletehappening, adminUpdateHappenig, happeningChangeStatus, adminAddHappening, getHappeningEdit } = require('../controllers/adminHappening')
const { adminNews, adminUploadNews, adminDeleteNews, adminUpdateNews, getadminUploadNews, getadminUpdateNews } = require('../controllers/adminNews')
const { adminUpdates, adminAddUpdates, AdminDeleteUpdate, getAdminUpdates, adminEditUpdates } = require('../controllers/adminUpdates')
const { adminHome } = require('../controllers/home')
const router=express.Router()



router
    .route('/')
    .get(adminHome)

router
    .route('/events')
    .get(adminEvents) 

router
    .route('/events/upload')
    .get(getAdminEventsUpload)
    .post(adminUploadEvents)   

router
    .route('/events/delete/:id')
    .get(adminDeleteEvents)
    
router
    .route('/events/update/:id')
    .get(getAdminUpdateEvents)
    .post(adminUpdateEvents)   
    
router
    .route('/events/status/:id')
    .get(EventsChangeStatus)    

router
    .route('/events/approve-event')
    .get(adminApproveEvents)
router
    .route('/events/approve-event/:id')
    .get(adminMakeApproveEvents)     
    
router
    .route('/events/approve-event/delete/:id')  
    .get(adminDeleteApproveEvents)  
    
router
    .route('/happening')
    .get(adminHappening)
    
router
    .route('/happening/upload')
    .get(adminAddHappening)
    .post(adminHappeningUpload)   

router
    .route('/happening/delete/:id')
    .get(adminDeletehappening)
    
router
    .route('/happening/update/:id')
    .get(getHappeningEdit)
    .post(adminUpdateHappenig)   
    
router
    .route('/happening/status/:id')
    .get(happeningChangeStatus)    
    

router
    .route('/news')
    .get(adminNews)
    
router
    .route('/news/upload')
    .get(getadminUploadNews)
    .post(adminUploadNews)  
 
router
    .route('/news/update/:id')
    .get(getadminUpdateNews)
    .post(adminUpdateNews)   
        
    
router
    .route('/news/delete/:id')
    .get(adminDeleteNews)    
    
    

router
    .route('/updates')
    .get(adminUpdates)
    .post(adminAddUpdates)
    
router
    .route('/updates/edit/:id')
    .get(getAdminUpdates)
    .post(adminEditUpdates)    

router
    .route('/updates/delete/:id')
    .get(AdminDeleteUpdate)    
    
    

module.exports=router

