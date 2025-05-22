const nodemailer = require('nodemailer');

function buildHTML(data) {
  let rows = '';
  for (let key in data) {
    rows += `<tr><td><strong>${key}</strong></td><td>${data[key]}</td></tr>`;
  }
  return `<table border="1" cellpadding="5">${rows}</table>`;
}

async function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = buildHTML(data);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.EMAIL_SUBJECT,
    html
  });
}

module.exports = { sendEmail };
