
const {Router}=require("express");
const user=Router()
const User=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const authentication = require("../middlewares/authentication");
const sendEmail=require("../config/nodemailer")



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

user.get("/profile",authentication,async(req,res)=>{
    try{
        const userDocument=await User.findOne(req.body);
        

        const token = jwt.sign({email:userDocument.email,id:userDocument._id}, process.env.SECRET_KEY);

        const userData={
            name:userDocument.name,
            email:userDocument.email,
            image:userDocument.image,
            favourite:userDocument.favourite,
            role:userDocument.role
        }

            res.status(200).send({mesg:"Authentication successful",profile:userData,token:token})
    }
    catch(err){
        res.status(500).send({mesg:"Internal server error !"})
    }
  
 
})

user.post("/get/otp",async(req,res)=>{
    try{
        const check=await User.findOne(req.body)

        if(!check){
           return  res.status(404).send({mesg:"User not found !"})
        }
        if(check){
            const generatedOtp= Math.floor(Math.random() * 100000).toString().padStart(5, "0");

            const mailerResponse=await sendEmail(req.body.email,generatedOtp)

            if(mailerResponse.messageId){
                try{
                    await User.findOneAndUpdate({email:req.body.email},{otp:generatedOtp});
                    const token=jwt.sign({email:req.body.email},process.env.SECRET_KEY)
                    res.status(200).send({mesg:"Otp sent successfully !",token:token})
                }
                catch(err){
                 res.status(500).send({mesg:"Internal server error !"})
                }
              
            }
        }
        
    }
    catch(err){
        res.status(500).send({mesg:"Internal server error !"})
    }
   
  
}) 

user.post("/otp/verify",async(req,res)=>{
   
    if(req.body.tokey===""){
        return res.status(403).send({mesg:"Invalid token !"})
    }
    try{
       const decoded=await jwt.verify(req.body.token,process.env.SECRET_KEY)
    
       const check=await User.findOne({email:decoded.email})

       if(check.otp===req.body.otp){
        const passwordToken=jwt.sign({email:decoded.email,verified:true},process.env.SECRET_KEY)
         res.status(200).send({mesg:"OTP verification successful !",passwordToken:passwordToken})
       }
       else if(check.otp!==req.body.top){
        res.status(403).send({mesg:"Incorrect OTP !"})
       }
    }
    catch(err){
        res.status(500).send({mesg:"Internal server error !"})
    }
})


user.patch("/password/change", async (req, res) => {
    const passwordToken = req.body.token;
  
    if (!passwordToken) {
      return res.status(403).send({ mesg: "Invalid token!" });
    }
  
    try {
      const decoded = await jwt.verify(passwordToken, process.env.SECRET_KEY);
  
      if (decoded.verified) {
        bcrypt.hash(req.body.password,4, async function (err, hash) {
            if(hash){
            const hashedPassword=hash
            await User.findOneAndUpdate({ email: decoded.email }, { $set: { password:hashedPassword } });

            res.status(200).send({ mesg: "Password updated successfully, please login!" });
            
            }
            if(err){
             res.status(500).send({mesg:"Something went wrong !"})
            }
           
        });  
        
      } else {
        res.status(403).send({ mesg: "Invalid token" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ mesg: "Internal server error!" });
    }
  });
  

module.exports=user;