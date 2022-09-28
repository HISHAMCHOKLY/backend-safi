const mongoose=require('mongoose')
let happeningSchema=new mongoose.Schema({
    id:String,
    image:{
        url:String,
        Public_Id:String
    },
    head:String,
    text:String,
    status:Boolean,
    link:String
})
module.exports=mongoose.model('Happening',happeningSchema)
