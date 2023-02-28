const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const User=require("../models/user.model")
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`${process.env.CALL_BACK_URL}`
  },
  async function(accessToken, refreshToken, profile, cb) {
    const {sub,name,picture,email,family_name}=profile._json;

    const document=await User.findOne({email:email});
    try{
     
      if(document){
        return  cb(null,document)
      }
      if(!document){
           let gender;
           if(family_name.toLowerCase()==="kumar"){
            gender="male"
           }
           if(family_name.toLowerCase()==="kumari"){
            gender="female"
           }
           let password=name+sub;
        const newUser=new User({
          name:name,
          googleId:sub,
          image:picture,
          email:email,
          gender:gender,
          role:"user",
          password:password,
          favourite:[]
        })
        await newUser.save(); 
       return  cb(null,newUser)
      }
         
    }
    catch(err){
      console.log("Error in google strategy",err)
    }
  
  }
));