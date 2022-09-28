const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
let userSchema=new mongoose.Schema({
    id:String,
    username:String,
    password:{
       select:false,
        type:String
    }, 
    admin:{
        type:Boolean,
        default:false
    },
    hod:{
        type:Boolean,
        default:false
    },
    alumni:{
        type:Boolean,
        default:false
    },
    department:String,
    deptfull:String
})


userSchema.pre('save',async function(next){
    if(!(this.isModified('password'))){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.pre('save',async function(next){
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
            this.deptfull=null
            break;
    }
})
userSchema.methods.isValidatedPassword=async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}

userSchema.methods.getJwtToken=function(){
    return jwt.sign(
        {
            username:this.username,
            department:this.department,
            deptfull:this.deptfull,
            admin:this.admin,
            hod:this.hod,
            alumni:this.alumni
        },process.env.JWT_SECRET,
        {expiresIn:'8h'}
    )
}



module.exports=mongoose.model('User',userSchema)