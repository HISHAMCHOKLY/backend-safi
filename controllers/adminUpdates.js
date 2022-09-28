let Update=require('../models/Update')

exports.adminUpdates=async(req,res)=>{
    let updates=await Update.find()
    updates.reverse()
    res.render('updates',{updates})
}
exports.getAdminUpdates=async(req,res)=>{
    let id=req.params.id
    let data=await Update.findOne({id:id})
    if(data){
        res.render('updatesUpdatePage',{data})
    }else{
        res.redirect('/404')
    }
    
}
exports.adminAddUpdates=async(req,res)=>{
    let{text,link}=req.body
    await Update.create({id:Date.now(),text:text,link:link})
    res.redirect('/admin/updates')
}

exports.adminEditUpdates=async(req,res)=>{
    let id=req.params.id
    let {text,link}=req.body
    let cdata=await Update.findOne({id:id})
    cdata.text=text
    cdata.link=link
    cdata.save()
    res.redirect('/admin/updates')
}

exports.AdminDeleteUpdate=async(req,res)=>{
    let id=req.params.id
    await Update.deleteOne({id:id})
    res.redirect('/admin/updates')

}