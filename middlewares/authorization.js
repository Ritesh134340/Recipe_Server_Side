const User=require("../models/user.model");


const authorization=(permittedRole)=>{

  return async(req,res,next)=>{
    const {email}=req.body;
    const check=User.findOne({email:email});

    const role=check.role

    if(permittedRole===role){
        next()
    }
    else{
        res.send({mesg:"Not authorized"})
    }
  }
}


module.exports=authorization;