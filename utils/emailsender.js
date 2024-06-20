import nodemailer from "nodemailer";

export const sendEmail = (email, subject, text) => {
   let transporer = nodemailer.createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      secure: false,
      auth: {
         user: process.env.User,
         pass: process.env.Password,
      },
   });
   let mailOptions = {
      from: process.env.User,
      to: email,
      subject: subject,
      text: text,
   };

   transporer.sendMail(mailOptions, (err, info) => {
      if (err) {
         console.log(err);
      } else {
         // console.log(info);
      }
   });
};
