const cloudinary=require('cloudinary').v2
const jwt=require('jsonwebtoken')
let Event=require('../models/Event')




exports.hodEvents=async (req,res)=>{
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    let deptfull=decoded.deptfull
    let data=await Event.find({department:decoded.department,approval:false})
    data.reverse()
    res.render('hodEvents',{data,deptfull})
}

exports.getHodUploadEvents=(req,res)=>{
    res.render('hodEventsAdd')
}

exports.hodUploadEvents=async(req,res)=>{
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    let file=req.files.photo
    let {head,text,link,cstatus}=req.body
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
        if(err){
            console.log(err)
            res.send('am error occured..pls try again')
        }
        let imgPublicId=result.public_id
        let imgurl=result.url
        if(!cstatus){
            cstatus=false
        }else{
            cstatus=true
        }
        await Event.create({id:Date.now(),head:head,text:text,image:{url:imgurl,Public_Id:imgPublicId},link:link,status:cstatus,department:decoded.department,departmentLink:`https://sias.edu.in/academics/${decoded.department}/index.html`,approval:false})
    })

    res.redirect('/hod/events')
    
    
}

exports.getHodUpdateEvents=async(req,res)=>{
    let id=req.params.id
    let data=await Event.findOne({id:id})
    if(data){
        res.render('hodEventsEdit',{data})
    }else{
        res.redirect('/404')
    }
}
exports.hodUpdatEevents=async(req,res)=>{
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
        res.redirect('/hod/Events')
    }else{
        res.redirect('/404')
    }
    
}
exports.hodDeleteEvents=async(req,res)=>{
    let id=req.params.id
    let product=await Event.findOne({id:id})
    const imgId=product.image.Public_Id
    await cloudinary.uploader.destroy(imgId);
    await Event.deleteOne({id:id})

    res.redirect('/hod/Events')
}