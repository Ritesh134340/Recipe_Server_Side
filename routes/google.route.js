const {Router}=require("express");
const passport=require("passport")
const auth=Router()



auth.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


auth.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login', passReqToCallback: true}),
  function(req, res) {
    // Successful authentication, redirect home.
    const user = req.user;
    res.redirect(`http://localhost:3000/check?user=${encodeURIComponent(JSON.stringify(user))}`);

    // const userString = encodeURIComponent(JSON.stringify(newUser));
    // res.redirect(`http://localhost:3000/googleCheck?user=${userString}`);

  });

  auth.get('/login',(req,res)=>{
    res.send("failed")
  })


  module.exports=auth