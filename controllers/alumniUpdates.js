let AlumniUpdate=require('../models/AlumniUpdate')
 

exports.getAlumniUpdates=async(req,res)=>{
    let updates=await AlumniUpdate.find()
    updates.reverse()
    res.render('alumniUpdates',{updates})
}

exports.alumniAddUpdates=async(req,res)=>{
    let{text,link}=req.body
    await AlumniUpdate.create({id:Date.now(),text:text,link:link})
    res.redirect('/alumni/updates')
}

exports.getAlumniUpdatesEdit=async(req,res)=>{
    let id=req.params.id
    let data=await AlumniUpdate.findOne({id:id})
    if(data){
        res.render('alumniUpdatesEditPage',{data})

    }else{
        res.redirect('/404')
    }
}
exports.alumniUpdatesEdit=async(req,res)=>{
    let id=req.params.id
    let {text,link}=req.body
    let cdata=await AlumniUpdate.findOne({id:id})
    if(cdata){
        cdata.text=text
    cdata.link=link
    cdata.save()
    res.redirect('/alumni/updates')
    }else{
        res.redirect('/404')
    }
    
}
exports.alumniDeleteUpdate=async(req,res)=>{
    let id=req.params.id
    await AlumniUpdate.deleteOne({id:id})
    res.redirect('/alumni/updates')

}