const cloudinary=require('cloudinary').v2
let News=require('../models/News')


exports.adminNews=async (req,res)=>{
    let data=await News.find()
    await data.reverse()
    res.render('news',{data})
}
exports.getadminUploadNews=async(req,res)=>{
    res.render('newsAdd')
}

exports.adminUploadNews=async(req,res)=>{
    let file=req.files.photo
    let {head,text}=req.body
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"saficlg"},async(err,result)=>{
        if(err){
            console.log(err)
            res.send('am error occured..pls try again')
        }
        let imgPublicId=result.public_id
        let imgurl=result.url
        await News.create({id:Date.now(),head:head,text:text,image:{url:imgurl,Public_Id:imgPublicId}})
    })
    res.redirect('/admin/news')  
}

exports.adminDeleteNews=async(req,res)=>{
    let id=req.params.id
    let product=await News.findOne({id:id})
    const imgId=product.image.Public_Id
    await cloudinary.uploader.destroy(imgId);
    await News.deleteOne({id:id})
    res.redirect('/admin/news')
}

exports.getadminUpdateNews=async(req,res)=>{
    let id=req.params.id
    let data=await News.findOne({id:id})
    if(data){
        res.render('newsedit',{data})
    }else{
        res.redirect('/404')
    }
    
}

exports.adminUpdateNews=async(req,res)=>{
    let id=req.params.id
    let {head,text}=req.body
    let cdata= await News.findOne({id:id})
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
            cdata.text=text
            cdata.head=head
            await cdata.save()
    
        }
        res.redirect('/admin/news')
    }else{
        res.redirect('/404')
    }
    
}