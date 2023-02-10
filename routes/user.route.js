
const {Router}=require("express");
const user=Router()
const User=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")



user.post("/login",async(req,res)=>{
    try{
        const check=await User.findOne({email:req.body.email})
    
        if(check){
            bcrypt.compare(req.body.password, check.password, function(err, result) {
               if(result){
                const token = jwt.sign({email:check.email,id:check._id}, process.env.SECRET_KEY);
            const userData={
                name:check.name,
                email:check.email,
                image:check.image,
                favourite:check.favourite,
                role:check.role
            }

                res.status(200).send({mesg:"Login Successful",profile:userData,token:token})
               }
               if(!result){
                res.status(401).send({mesg:"Invalid Credential"})
               }
               if(err){
                res.status(500).send({mesg:err})
               }
            });
      
        }
        else{
            res.status(404).send({mesg:"User not found, please signup !"})
        }
      
    }
    catch(err){
     res.status(500).send({mesg:"Something went wrong, try again later !"})
    }
  
})

user.post("/add/favourite",async(req,res)=>{
    await User.updateOne({ email:req.body.email }, { $push: { favourite: req.body.videoId } });
    res.send({mesg:"Added to favourite !"})
})

user.post("/signup",async(req,res)=>{
    
    const {name,gender,email,password,image} =req.body
    
    const check=await User.findOne({email:email})
    if(check){
     res.status(409).send({mesg:"User already exist,please login !"})
    }
    else{
        try{
            bcrypt.hash(password,4, async function (err, hash) {
                if(hash){
                const hashedPassword=hash
                const signupData={
                    name:name,
                    email:email,
                    password:hashedPassword,
                    gender:gender,
                    image:image
                }

                const newUser=new User(signupData)

                await newUser.save()

                const savedDocument=await User.findOne({email:email})
               
                const token=jwt.sign({email:email,id:savedDocument._id},process.env.SECRET_KEY)

                res.status(201).send({mesg:"Signup Successful !",profile:savedDocument,token:token})
                }
                if(err){
                 res.status(500).send({mesg:"Signup failed !"})
                }
               
            });  
        }
        catch(err){
         res.status(500).send({mesg:"Internal server error !"})
        }
    }

})


module.exports=user;