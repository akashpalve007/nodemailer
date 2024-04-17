const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SMTP Transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "maudie6@ethereal.email",
    pass: "MumWYBREyZhCWsVDzC",
  },
});

// Email sending route
app.post("/send-email", (req, res) => {
  const {
    from,
    to,
    date,
    returnDate,
    passengers,
    firstName,
    lastName,
    email,
    phone,
  } = req.body;

  const mailOptions = {
    from: "sydni97@ethereal.email", // Sender address
    to: "akash.palve.techinvento@gmail.com", // List of recipients
    subject: "New Travel Request",
    text: `From: ${from}\nTo: ${to}\nDate: ${date}\nReturn: ${returnDate}\nPassengers: ${passengers}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email Sent Successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
