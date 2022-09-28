let Event=require('../models/Event')
let Happening=require('../models/Happening')
let News=require('../models/News')
let Update=require('../models/Update')
let AlumniUpdate=require('../models/AlumniUpdate')

exports.home=async(req,res)=>{
    let activeHappeing=await Happening.find({currentStatus:true})
    let activeNews=await News.find().sort({'_id':-1}).limit(4)
    let activeEvent=await Event.find({currentStatus:true,approval:true})
    let updates=await Update.find()
    res.json({activeHappeing,activeNews,activeEvent,updates})
}

exports.AlumniUpdates=async(req,res)=>{
    let alumniUpdates=await AlumniUpdate.find()
    res.json({alumniUpdates})
}
exports.getEvents=async(req,res)=>{
    let events=await Event.find().sort({'_id':-1})
    res.json({events})
}
exports.getNews=async(req,res)=>{
    let news=await News.find().sort({'_id':-1})
    res.json({news})
}
exports.getHappening=async(req,res)=>{
    let happening=await Happening.find().sort({'_id':-1})
    res.json({happening})
}