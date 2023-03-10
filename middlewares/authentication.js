const jwt=require("jsonwebtoken")


const authentication=async(req,res,next)=>{
  
    const token=req.headers?.authorization?.split(" ")[1];
   
    try{
      jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
       if(decoded){
      
        req.body.email=decoded.email;
        if(decoded.googleId){
        req.body.googleId=decoded.googleId
        }
        if(decoded.id){
          req.body.id=decoded.id
        }

        next()
        
       }
       if(err){
        console.log(err,"Error from authentication middleware !")
        res.status(401).send({mesg:"Invalid token !"})
       }
      })
   
    }
    catch(err){
             console.log(err,"Error from authentication middleware")
             res.status(500).send({ mesg: 'Internal server error !' });
          
    }
 
}


module.exports=authentication