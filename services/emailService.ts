import nodemailer from 'nodemailer';
import handlebars from 'handlebars'
import fs from 'fs/promises';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Ganti dengan layanan email yang Anda gunakan
  auth: {
    user: 'fathullahmunadi1406@gmail.com',
    pass: 'obqujfyrlkzsiuaq',
  },
});

export const sendEmail = async (otp: number, recipientEmail: string) => {
  try {
    const templateSource = await fs.readFile('src/template/otpTemplate.html', 'utf8');
    const template = handlebars.compile(templateSource);
    
    const html = template({ otp });
    
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: recipientEmail,
      subject: 'Your OTP Code',
      html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

