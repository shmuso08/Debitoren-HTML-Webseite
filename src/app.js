require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importiere die CORS-Middleware
const { sendEmail } = require('./emailService');

const app = express();

// Aktiviere CORS für alle Anfragen. Dies ist wichtig, da deine HTML-Datei lokal läuft.
app.use(cors());

// Middleware zum Parsen von JSON-Anfragekörpern
app.use(express.json());
// Middleware zum Parsen von URL-kodierten Anfragekörpern (wichtig für Formularübermittlungen)
app.use(express.urlencoded({ extended: true }));

// Einfache Root-Route, um zu überprüfen, ob der Server läuft
app.get('/', (req, res) => {
  res.send('Express API for forms is running.');
});

// POST-Route zum Empfangen der Formulardaten und Senden der E-Mail
app.post('/submit', async (req, res) => {
  try {
    console.log('Empfangene Formulardaten:', req.body); // Zur Fehlersuche: Zeigt die empfangenen Daten in der Serverkonsole an
    await sendEmail(req.body); // Rufe den E-Mail-Dienst mit den Daten auf
    res.status(200).send({ message: 'E-Mail erfolgreich gesendet!' });
  } catch (err) {
    console.error('Fehler beim Verarbeiten der Anfrage /submit:', err); // Detaillierteres Fehler-Logging
    res.status(500).send({ error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.' });
  }
});

// Starte den Server auf dem definierten Port
app.listen(process.env.PORT, () => {
  console.log(`Server läuft auf Port ${process.env.PORT}`);
});