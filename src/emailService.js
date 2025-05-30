require('dotenv').config();
const nodemailer = require('nodemailer');
const { createEmailHtml } = require('./emailTemplate'); // <-- NEUE ZEILE: Importiere die HTML-Vorlage

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Sendet eine E-Mail mit den übermittelten Formulardaten.
 * @param {Object} formData - Ein Objekt, das die Formulardaten enthält.
 */
async function sendEmail(formData) {
  // Erstelle den HTML-Inhalt für die E-Mail
  const htmlEmailContent = createEmailHtml(formData); // <-- NEUE ZEILE: Rufe die HTML-Vorlage auf

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.EMAIL_SUBJECT,
    // text: emailContent, // <-- DIESE ZEILE ENTFERNEN (oder auskommentieren)
    html: htmlEmailContent, // <-- DIESE ZEILE HINZUFÜGEN für HTML-E-Mail
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet an:', process.env.EMAIL_TO);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    throw error;
  }
}

module.exports = { sendEmail };