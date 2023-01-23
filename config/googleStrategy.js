const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const User=require("../models/user.model")
require("dotenv").config()

passport.serializeUser(function(user, done) {
  done(null,user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then((res)=>{
   return  done(null, res);
  })

});




passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://oauth-test-passportjs.onrender.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const {sub,name,picture,email}=profile._json;
    

    try{
      const document=await User.findOne({email:email});
      if(document){
         cb(null,document)
      }
      else{
        const newUser=new User({
          name:name,
          email:email,
          googleId:sub,
          image:picture,
          email:email
        })

        await newUser.save();
        const doc=User.findOne({email:email})
        cb(null,doc)
      }
         
    }
    catch(err){
      console.log(err)
    }
  
  }
));