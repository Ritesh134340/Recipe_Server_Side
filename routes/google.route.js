const {Router}=require("express");
const passport=require("passport");
const jwt=require("jsonwebtoken")
const auth=Router()

auth.get('/facebook',
  passport.authenticate('facebook',{ scope : ['email'] }));


  auth.get('/facebook/callback',(req,res,next)=>{

    passport.authenticate('facebook',(err,user)=>{

      if(err){
  
        return next(err)
      }
      if (!user) {
       
         return res.redirect(`${process.env.CLIENT_ADDRESS}/login`);
     }
     if(user){
     
      const authtoken=jwt.sign( {
        email:user.email,
        facebookId:user.facebookId
      },process.env.SECRET_KEY)
  
      const token=jwt.sign({auth:authtoken},process.env.SECRET_KEY,{expiresIn:'5m'})
  
      const userString = encodeURIComponent(JSON.stringify(token));
      res.redirect(`${process.env.CLIENT_ADDRESS}/redirect?jwt=${userString}`);
      
     }
    })(req, res, next);
  
  })
   



auth.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));




  
auth.get('/google/callback',(req,res,next)=>{
  console.log(process.env.CLIENT_ADDRESS)
  passport.authenticate('google',(err,user)=>{
    if(err){
     
      return next(err)
    }
    if (!user) {
     
       return res.redirect(`${process.env.CLIENT_ADDRESS}/login`);
   }
   if(user){
   
    const authtoken=jwt.sign( {
      email:user.email,
      googleId:user.googleId
    },process.env.SECRET_KEY)

    const token=jwt.sign({auth:authtoken},process.env.SECRET_KEY,{expiresIn:'5m'})

    const userString = encodeURIComponent(JSON.stringify(token));

    res.redirect(`https://recipe-server-8xyf.onrender.com/redirect?jwt=${userString}`);
    
   }
  })(req, res, next);

})
 


  module.exports=auth