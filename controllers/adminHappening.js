const cloudinary=require('cloudinary').v2
let Happening=require('../models/Happening')


exports.adminHappening=async (req,res)=>{
    let data=await Happening.find()
    data.reverse()
    res.render('happening',{data})
}

exports.adminAddHappening=(req,res)=>{
    res.render('happeningAdd')
}

exports.adminHappeningUpload=async(req,res)=>{
    let file=req.files.photo
    let {head,text,link,cstatus}=req.body
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
        let imgPublicId=result.public_id
        let imgurl=result.url
        if(!cstatus){
            cstatus=false
        }else{
            cstatus=true
        }
        await Happening.create({id:Date.now(),head:head,text:text,image:{url:imgurl,Public_Id:imgPublicId},link:link,status:cstatus})
    })
    res.redirect('/admin/happening')

    
    
}

exports.adminDeletehappening=async(req,res)=>{
    let id=req.params.id
    let product=await Happening.findOne({id:id})
    const imgId=product.image.Public_Id
    await cloudinary.uploader.destroy(imgId);
    await Happening.deleteOne({id:id})

    res.redirect('/admin/happening')
}
exports.getHappeningEdit=async(req,res)=>{
    let id=req.params.id
    let data=await Happening.findOne({id:id})
    if(data){
        res.render('happeningEdit',{data})
    }else{
        res.redirect('/404')
    }
    
}
exports.adminUpdateHappenig=async(req,res)=>{
    let id=req.params.id
    let {head,text}=req.body
    let cdata= await Happening.findOne({id:id})
    if(cdata){
        if(req.files){
            let file=req.files.photo
            const imgId=cdata.image.Public_Id
            await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
                if(err){
                    console.log(err)
                    res.send('am error occured..pls try again')
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
        
        res.redirect('/admin/happening')
    }else{
        res.redirect('/404')
    }
    
}

exports.happeningChangeStatus=async(req,res)=>{
    let id=req.params.id
    let cdata=await Happening.findOne({id:id})
    if(cdata.status){
        cdata.status=false     
    }else{
        cdata.status=true
    }
    await cdata.save()
    res.redirect('/admin/happening')
    
}