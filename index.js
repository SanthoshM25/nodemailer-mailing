const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let mailOptions = {
  from: "onlinegurudev3@gmail.com",
  to: "onlinegurudev3@gmail.com",
  subject: "Test mail",
  text: "Hi from your nodemailer project",
};

const port = 8000;

app.listen(port, () => {
  console.log("Server listening on Port 3001");
});

app.get("/", (req, res) => {
  console.log("hello");
  try {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        res.send(data);
        console.log("Email sent successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
