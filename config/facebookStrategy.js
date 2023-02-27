
const passport =require("passport")
const FacebookStrategy = require('passport-facebook').Strategy;
const User=require("../models/user.model")
require("dotenv").config()


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://recipe-server-8xyf.onrender.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const profileData=profile._json
    const data={
      facebookId:profileData.id,
      name:profileData.name,
      image:profileData.picture.data.url,
      email:profileData.email
    }
    const {facebookId,name,image,email}=data;

    const document =await User.findOne({email:email})
    try{
        
         if(document){
          return cb(null,document)
         }
         if(!document){
             let password=email+facebookId;

             const newUser=new User({
              name:name,
              email:email,
              facebookId:facebookId,
              image:image,
              role:"user",
              password:password,
              favourite:[]
             })
             await newUser.save();
             return cb(null,newUser)
         }
    }
    catch(err){
     console.log("Error in facebook strategy",err)
    }

  }
));