const express=require("express")
const connection=require("./config/db");
const  app=express();
// const passport=require("passport")
const cors=require("cors");

// const cookieSession=require("cookie-session");
// const  cookieParser = require('cookie-parser')
const appRoute=require("./routes/app.route")
const googleRoute=require("./routes/google.route");
const userRoute=require("./routes/user.route");
const adminRoute=require("./routes/admin.route")


  
require("dotenv").config();
// require("./config/googleStrategy")

app.use(cors({origin:"*"}))

// app.use(cookieSession({
//     name: 'session',
//     keys: ['secretKey1', 'secretKey2'],
//     maxAge: 24 * 60 * 60 * 1000 
// }));


// app.use(passport.initialize())
// app.use(passport.session())
app.use(express.json());
// app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send({mesg:"Welcome to Recipe"})
})
app.use("/app",appRoute)
app.use("/auth",googleRoute)
app.use("/user",userRoute)
app.use("/admin",adminRoute)



const PORT=8080 || 8000 ;
app.listen(PORT,async()=>{
    try{
       await connection;
      console.log("Database connection Successful")
    }
    catch(err){
        console.log("Couldn't connect to database")
    }
    await connection;

    console.log("app is running in port ", PORT)
})