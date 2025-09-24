const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

module.exports = async ({ to, subject, text, html }) => {
    const info = await transporter.sendMail({
        from: `"Dish Booking" <${process.env.EMAIL_USER}>`,
        to, subject, text, html
    });
    // If Ethereal, print preview URL
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    return info;
};
