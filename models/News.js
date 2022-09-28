const mongoose=require('mongoose')
let newsSchema=new mongoose.Schema({
    id:String,
    image:{
        url:String,
        Public_Id:String
    },
    head:String,
    text:String
})
module.exports=mongoose.model('News',newsSchema)