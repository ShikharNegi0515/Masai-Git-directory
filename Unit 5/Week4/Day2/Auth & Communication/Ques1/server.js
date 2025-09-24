const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route to send email
app.get("/sendemail", async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: `"NEM Student" <${process.env.EMAIL_USER}>`,
            to: ["shikharnegi31@gmail.com", "venugopal.burli@masaischool.com"],
            subject: "Testing Mail",
            text: "This is a testing Mail sent by NEM student, no need to reply.",
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.send("✅ Email has been sent! Check console for preview URL.");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Error sending email");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
