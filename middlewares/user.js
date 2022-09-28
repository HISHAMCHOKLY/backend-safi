const jwt=require('jsonwebtoken')

exports.isLoggedin = async (req,res,next)=>{
    const token = req.cookies.token
    
    if(token){
        try{
            const decoded =await jwt.verify(token,process.env.JWT_SECRET)
            req.username=decoded.username
            next()
        }catch(err){
            res.status(403).send({
                success:false,
                message:err
                
            })
        }
    }else{
        return res.redirect('/login')
    }
}
exports.ifLoggedin=async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        next()
    }else{
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.admin){
            res.redirect('/admin')
        }else if(decoded.hod){
            res.redirect('/hod')
        }else if(decoded.alumni){
            res.redirect('/alumni')
        }else{
            res.render('404')
        }
    }
}
exports.isAlumni=async (req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.alumni){
            next()
        }else{
            res.redirect('/login')
        }
    }
      
}
exports.isHod=async (req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.hod){
            next()
        }else{
            res.redirect('/login')
        }   
    }
    
}
exports.isAdmin=async(req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.admin){
            next()
        }
         else{
        res.redirect('/login')
    } 
}  
}
exports.checkUser=async(req,res,next)=>{
    const token = req.cookies.token
    if(token){
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.userType=='alumni'){
            res.redirect('/alumni')
        }else if(decoded.userType=='hod'){
            res.redirect('/hod')
        }
        else{
            next()
        }
    }else{
        res.render('404')
    } 
}

