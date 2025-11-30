import nodemailer from "nodemailer";
import dotenv from "dotenv"; //? load environment variables

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Algo Arcade" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// // 1. تأكد إن السطر ده موجود عشان يحمل المتغيرات لو مش متحملة
// dotenv.config(); 

// export const sendEmail = async (to, subject, html) => {
  
//   // 2. Debugging: اطبع عشان نتأكد إن فيرسل قاري البيانات قبل ما يبدأ
//   console.log("Attempting to send email...");
//   console.log("User:", process.env.EMAIL_USER);
//   // بنطبع طول الباسورد بس عشان الأمان
//   console.log("Pass Loaded?", process.env.EMAIL_PASS ? "Yes" : "No"); 

//   const transporter = nodemailer.createTransport({
//     // بدل service: 'gmail' هنستخدم الإعدادات الصريحة
//     host: "smtp.gmail.com",
//     port: 465,       // بورت 465 هو المخصص للاتصال الآمن SSL
//     secure: true,    // لازم تكون true مع بورت 465
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Algo Arcade" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error; // ارمي الخطأ عشان الـ Controller يعرف إن في مشكلة
//   }
// };