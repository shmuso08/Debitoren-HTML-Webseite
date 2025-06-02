require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- HINZUGEFÜGT: Für Pfadmanipulation
const { sendEmail } = require('./emailService'); // Pfad ist relativ zu app.js (also src/emailService.js)

const app = express();

// Aktiviere CORS für alle Anfragen. Wichtig für die Entwicklung.
app.use(cors());

// Middleware zum Parsen von JSON- und URL-kodierten Anfragekörpern
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// <-- NEU/KORRIGIERT: Statische Dateien aus dem Projekt-Root-Verzeichnis bereitstellen
// Der `__dirname` ist der Pfad zum aktuellen Skript (src/), daher gehen wir mit '..' ein Verzeichnis hoch
app.use(express.static(path.join(__dirname, '..')));

// Optional: Eine einfache Root-Route, falls du sie zusätzlich zur statischen Datei haben möchtest.
// Ansonsten wird der Zugriff auf '/' direkt index.html liefern.
// app.get('/', (req, res) => {
//   res.send('Express API for forms is running.');
// });

// POST-Route zum Empfangen der Formulardaten und Senden der E-Mail
app.post('/submit', async (req, res) => {
  try {
    console.log('Empfangene Formulardaten:', req.body);
    await sendEmail(req.body);
    res.status(200).send({ message: 'E-Mail erfolgreich gesendet!' });
  } catch (err) {
    console.error('Fehler beim Verarbeiten der Anfrage /submit:', err);
    res.status(500).send({ error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.' });
  }
});

// Starte den Server auf dem definierten Port (mit Fallback)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});