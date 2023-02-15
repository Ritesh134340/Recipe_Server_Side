const nodemailer = require("nodemailer");
require("dotenv").config()

 async function sendEmail(email,generatedOtp) {
  const subject="Recipe password reset";
  const text=`Your otp to reset password is : ${generatedOtp}`

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user:process.env.NODEMAILER_EMAIL,
      pass:process.env.NODEMAILER_PASSWORD
    }
  });


  let mailOptions = {
    from:"riteskumar134340@gmail.com",
    to: email,
    subject: subject,
    text: text
  };


  const mailerResponse=await transporter.sendMail(mailOptions);

  return mailerResponse;


}





module.exports=sendEmail;