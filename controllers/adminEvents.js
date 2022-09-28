const cloudinary=require('cloudinary').v2
let Event=require('../models/Event')




exports.adminEvents=async (req,res)=>{
    let data=await Event.find({approval:true})
    data.reverse()
    res.render('events',{data})
}



exports.getAdminEventsUpload=(req,res)=>{
    res.render('eventsAdd')
}

exports.adminUploadEvents=async(req,res)=>{
    let file=req.files.photo
    let {head,text,link,cstatus,department}=req.body
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
        let imgPublicId=result.public_id
        let imgurl=result.url
        if(!cstatus){
            cstatus=false
        }else{
            cstatus=true
        }
        await Event.create({id:Date.now(),head:head,text:text,image:{url:imgurl,Public_Id:imgPublicId},link:link,status:cstatus,department:department,departmentLink:`https://sias.edu.in/academics/${department}/index.html`,approval:true})
    })
    res.redirect('/admin/events')    
    
}

exports.adminDeleteEvents=async(req,res)=>{
    let id=req.params.id
    let product=await Event.findOne({id:id})
    const imgId=product.image.Public_Id
    await cloudinary.uploader.destroy(imgId);
    await Event.deleteOne({id:id})

    res.redirect('/admin/Events')
}
exports.getAdminUpdateEvents=async(req,res)=>{
    let id=req.params.id
    let data=await Event.findOne({id:id})
    if(data){
        res.render('eventsEdit',{data})
    }else{
        res.redirect('/404')
    }
}
exports.adminUpdateEvents=async(req,res)=>{
    let id=req.params.id
    let {head,text}=req.body
    let cdata= await Event.findOne({id:id})
    if(cdata){
        if(req.files){
            let file=req.files.photo
            const imgId=cdata.image.Public_Id
            await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
                if(err){
                    console.log(err)
                    res.send('an error occured..pls try again')
                }
                cloudinary.uploader.destroy(imgId);
                let imgPublicId=result.public_id
                let imgurl=result.url
                cdata.image.url=imgurl
                cdata.image.Public_Id=imgPublicId
                cdata.head=head
                cdata.text=text
                await cdata.save()
    
            })
        }else{
            cdata.head=head
            cdata.text=text
            await cdata.save()
        }
        res.redirect('/admin/Events')
    }else{
        res.redirect('/404')
    }
    
}
exports.EventsChangeStatus=async(req,res)=>{
    let id=req.params.id
    let cdata=await Event.findOne({id:id})
    if(cdata.status){
        cdata.status=false
    }else{
        cdata.status=true
    }
    await cdata.save()
    res.redirect('/admin/Events')
}
exports.adminApproveEvents=async(req,res)=>{
    let events=await Event.find({approval:false})
    res.render('approveEvent',{events})
}

exports.adminMakeApproveEvents=async(req,res)=>{
    let id=req.params.id
    let cdata=await Event.findOne({id:id})
    cdata.approval=true
    cdata.save()
    res.redirect('/admin/events/approve-event')
    
}
exports.adminDeleteApproveEvents=async(req,res)=>{
    let id=req.params.id
    let product=await Event.findOne({id:id})
    const imgId=product.image.Public_Id
    await cloudinary.uploader.destroy(imgId);
    await Event.deleteOne({id:id})

    res.redirect('/admin/events/approve-event')
}