import nodemailer from "nodemailer";
import {EMAIL, PASSWORD} from '../config.js';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function main(email, otp) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Het Shukla" <${EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "OTP for verification", // Subject line
    html: `<h1>OTP for verification at our app</h1> <br /> <b>If you have not send this otp then ignore this email</b> <br /> <h1>${otp}</h1> <br /> <p>It is valid for 5 minutes only</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

