import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  const testAccount = await nodemailer.createTestAccount();

  console.log("testAccount", testAccount);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "lq2qwzhz6rzv325v@ethereal.email",
      pass: "fK5gmgf1kQszqVvHqg",
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo"<foo@example.com>',
    to,
    subject: "Change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
