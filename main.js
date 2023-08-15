require("dotenv").config();

const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");

  next();
});

app.post("/", async (req, res) => {

  const { name, email, subject } = req.body;

  const info = await transporter.sendMail({
    from: `Bot <${process.env.EMAIL}>`,
    to: process.env.PERSONALEMAIL,
    subject: "Cliente",
    text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}`
  })

  res.json({
    send: true,
    status: info
  });

});

app.listen(3000);