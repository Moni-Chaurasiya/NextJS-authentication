import nodemailer from "nodemailer"
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
export const sendEmail = async({email, emailType,userId}:any)=>{
    try {

      const hashedToken=  await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken, verifyTokenExpiry:Date.now()+3600000})
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{forgotPaswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now()+3600000})

        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "78041f8704ccbd",
              pass: "80b30bc6e26ae1"
            }
          });

          const mailOptions={
            
                from: 'moni@moni.ai', // sender address
                to: email, // list of receivers
                subject: emailType==='VERIFY'? "Verify your email": "Resest your password", // Subject line
              
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
                    emailType==="VERIFY" ? "verify your email": "Reset your Password"
                } or copy and paste the link below in your browser.
                <br>
                ${process.env.DOMAIN}/varifyemail?token=${hashedToken}
                </p>`,
              
          }
          const mailResponse= await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        console.log("Error sending mail")
        throw new Error(error.message)
    }
}