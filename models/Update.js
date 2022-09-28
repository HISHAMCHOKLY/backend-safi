const mongoose=require('mongoose')
let updateSchema=new mongoose.Schema({
    id:String,
    text:String,
    link:String
})
module.exports=mongoose.model('Update',updateSchema)