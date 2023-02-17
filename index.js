const express = require("express");
const session=require('express-session')
const connection = require("./config/db");
const app = express();
const passport = require("passport");
const cors = require("cors");

const appRoute = require("./routes/app.route");
const googleRoute = require("./routes/google.route");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");

require("dotenv").config();
require("./config/googleStrategy");
require("./config/facebookStrategy");

app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(session({

  secret:process.env.SECRET_KEY,
  cookie:{},
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize());
app.use(express.json());

app.get("/", (req, res) => {
  
  res.send({ mesg: "Welcome to Recipe" });
});
app.use("/app", appRoute);
app.use("/auth", googleRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

const PORT = process.env.PORT || 27017;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connection Successful");
  } catch (err) {
    console.log(err);
    console.log("Couldn't connect to database");
  }

  console.log("app is running in port ", PORT);
});
