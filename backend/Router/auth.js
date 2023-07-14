const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const validateToken = require("../middleware/middleware")
const mongoose = require("mongoose")
const uri = "mongodb+srv://lwinwinyanwai:waiyan2521@cluster0.kzygcaa.mongodb.net/?retryWrites=true&w=majority"
const Users = require("../model/users");
const Profile = require("../model/profile")

mongoose.connect(uri)
.then( res => {
    console.log("data base connected")
})

// user sign up route
router.post("/signup",[
    check("email","please fill the validate email.").isEmail(),
    check("password","please fill the password greater than six character.").isLength({
        min:6 
    })
], async (req,res)=>{

    const {email,password} = req.body
    const error = validationResult(req);


    if(!error.isEmpty()){
      return res.status("404").json({
        error: error.array()
      })
    }
    
    let finduser = await Users.find({email:email});
    if(finduser){
      return res.status(400).res.json({error:[
        {message:  "Email is already registered"}
      ]})
    }

    const harshedpassword = await bcrypt.hash(password,10);
    const user = await Users.create({
      email,
      password:harshedpassword
    })
    user.save()

   const token = jwt.sign({
    email
   },"fhiodhasdhw3q23josd",{
    expiresIn:2500000
   })

   res.cookie("access-token", token ,{
    maxAge:60*60*24*30*1000
   })
    res.json({access_email:email})
})

// all profile route
router.post("/profile",async (req,res)=>{
  const {username,gender,age,email,bio} = req.body
  let checkemail = await Profile.find({email,email});

  if(checkemail.length !== 0){
    return res.status(400).json({
      error:[
        {
          message:"profile already exist"
        }
      ]
    })
  }

 const userprofile = new Profile({
  username,
    gender,
    age,
    email,
    bio
 })

 userprofile.save()
 res.send("nice")
})

router.get("/profile",validateToken,async (req,res)=>{
  const checkEmail = await req.headers["x-email"];
  const profileCheck = await Profile.find({email:checkEmail})
  
  if(!profileCheck){
    return res.status("400").json({
      error:[
            {
              "message":"There is no such a profile"
            }
            ]
    })
    }
   res.json({profileCheck})
})


// user sign in route
router.post("/login" , async (req,res)=>{
  const {email,password} = req.body;

  let finduser = await Users.find({email:email});
  
  if(finduser.length === 0){
   return res.status(400).res.json({
      error:[
        {
          "message":"Plaese provide valide creditial"
        }
      ]
    })
  }


  let isMatch = await bcrypt.compare(password, finduser[0].password)
  if(!isMatch){
    return res.status(400).json({
       error:[
         {
           "message":"Plaese provide valide creditial"
         }
       ]
     })
   }

   const token = jwt.sign({
    email
   },"fhiodhasdhw3q23josd",{
    expiresIn:2500000
   })
   res.cookie("access-token", token ,{
    maxAge:60*60*24*30*1000,
   })
    res.json({access_email:email})
    
})

module.exports = router