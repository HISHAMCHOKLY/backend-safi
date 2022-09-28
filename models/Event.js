const mongoose=require('mongoose')
let eventsSchema=new mongoose.Schema({
    id:String,
    image:{
        url:String,
        Public_Id:String
    },
    head:String,
    text:String,
    status:Boolean,
    link:String,
    approval:Boolean,
    department:String,
    departmentLink:String,
    deptfull:String    
})

eventsSchema.pre('save',async function(next){
    switch (this.department) {
        case 'cs':
            this.deptfull='Dept Of Computer Science'
            break;
        case 'biotechnology':
            this.deptfull='Dept Of Biotechnology'
            break;    
        case 'microbiology':
            this.deptfull='Dept Of Microbiology'
            break;
        case 'foodtechnology':
            this.deptfull='Dept Of Foodtechnology'
            break;
        case 'psychology':
            this.deptfull='Dept Of Psychology'
            break;
        case 'physics':
            this.deptfull='Dept Of Physics'
            break;
        case 'commerce':
            this.deptfull='Dept Of Commerce'
            break;
        case 'management':
            this.deptfull='Dept Of Management'
            break;
        case 'economics':
            this.deptfull='Dept Of Economics'
            break;
        case 'if':
            this.deptfull='Dept Of Islamic Finance'
            break;  
        case 'jmc':
            this.deptfull='Dept Of Journalism and Mass Communication'
            break;  
        case 'english':
            this.deptfull='Dept Of English'
            break;  
        case 'is':
            this.deptfull='Dept Of Islamic Studies'
            break;  
        case 'pe':
            this.deptfull='Dept Of Physical Education'
            break;      
            
        default:

            break;
    }
})
module.exports=mongoose.model('Event',eventsSchema)