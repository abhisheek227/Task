import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abhixse.azord@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
});




const data = async (req,res) => {
  const info = await transporter.sendMail({
    from: '"Abhishek Yadav" <abhixse.azord@gmail.com>',
    to: "abhisheek227@gmail.com",
    subject: "Task ",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>This email is for testing </b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
  res.json({
    detail: info
  })
}

export { data, transporter }