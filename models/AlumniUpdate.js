const mongoose=require('mongoose')
let alumniUpdateSchema=new mongoose.Schema({
    id:String,
    text:String,
    link:String
})
module.exports=mongoose.model('AlumniUpdate',alumniUpdateSchema)