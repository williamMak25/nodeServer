const jwt = require("jsonwebtoken")


const validateToken = async (req,res,next) => {

 const cookie = req.headers.cookies
 console.log(cookie)
 const accesstoken = cookie.replace("access-token=","")
 
 if(!accesstoken) return res.status(400).json({error:"User not authenticated"})
    try{
        const validToken = await jwt.verify(accesstoken,"fhiodhasdhw3q23josd")
        if(validToken){
            req.authenticated  = true
            return next()
        }
    }catch(err){
       return res.status(400).json({error : err})
    }
}

module.exports = validateToken