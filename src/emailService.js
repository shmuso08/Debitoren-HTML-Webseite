require('dotenv').config();
const nodemailer = require('nodemailer');

// Erstelle den Transporter für den E-Mail-Versand
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // Konvertiert den String zu einem Boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Optional: Füge tls-Optionen hinzu, falls Probleme auftreten
  tls: {
    rejectUnauthorized: false // Dies ist oft für lokale Entwicklung hilfreich, aber in Produktion nicht empfohlen
  }
});

/**
 * Sendet eine E-Mail mit den übermittelten Formulardaten.
 * @param {Object} formData - Ein Objekt, das die Formulardaten enthält.
 */
async function sendEmail(formData) {
  let emailContent = 'Neue Formularübermittlung:\n\n';

  // Iteriere über die Formulardaten und füge sie dem E-Mail-Inhalt hinzu
  for (const key in formData) {
    if (Object.hasOwnProperty.call(formData, key)) {
      let value = formData[key];
      // Spezialbehandlung für Array-Werte (z.B. Checkboxen)
      if (Array.isArray(value)) {
        value = value.join(', '); // Füge Array-Elemente mit Komma und Leerzeichen zusammen
      }
      emailContent += `${key.replace(/_(\d+)/g, ' $1').replace(/produkt/g, 'Produkt').replace(/menge/g, 'Menge').replace(/preis/g, 'Preis').replace(/bemerkung/g, 'Bemerkung').replace(/subartikel/g, 'Unterartikel')}: ${value}\n`;
    }
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,    // Absenderadresse
    to: process.env.EMAIL_TO,        // Empfängeradresse
    subject: process.env.EMAIL_SUBJECT, // Betreff der E-Mail
    text: emailContent,              // Der reine Textinhalt der E-Mail
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet an:', process.env.EMAIL_TO);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    // Hier kannst du detailliertere Fehlerinformationen loggen, z.B. error.response
    throw error; // Wirf den Fehler weiter, damit der Server ihn abfangen kann
  }
}

module.exports = { sendEmail };