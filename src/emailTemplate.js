/**
 * Erstellt eine HTML-Vorlage für die E-Mail mit den übermittelten Formulardaten.
 * @param {Object} formData - Ein Objekt, das die Formulardaten enthält.
 * @returns {string} Der generierte HTML-String für die E-Mail.
 */
function createEmailHtml(formData) {
  // Beginne mit dem Grundgerüst der HTML-E-Mail
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neue Debitoren Verkaufsrechnung</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-top: 5px solid #053e54; /* Deine "Stiftung-Farbe" */
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eeeeee;
            }
            .header h1 {
                color: #053e54;
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding-top: 20px;
            }
            .content p {
                margin-bottom: 10px;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }
            .data-table th, .data-table td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }
            .data-table th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                margin-top: 30px;
                border-top: 1px solid #eeeeee;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Neue Debitoren Verkaufsrechnung</h1>
            </div>
            <div class="content">
                <p>Sehr geehrte Damen und Herren,</p>
                <p>Es liegt eine neue Übermittlung der Debitoren Verkaufsrechnung vor. Hier sind die Details:</p>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Feld</th>
                            <th>Wert</th>
                        </tr>
                    </thead>
                    <tbody>
  `;

  // Füge die Formulardaten in die Tabelle ein
  for (const key in formData) {
    if (Object.hasOwnProperty.call(formData, key)) {
      let value = formData[key];

      // Formatierung der Schlüssel für bessere Lesbarkeit
      let displayKey = key.replace(/_(\d+)/g, ' $1') // z.B. produkt_0 -> produkt 0
                        
                            .replace(/anrede/g, 'Anrede')
                            .replace(/firma/g, 'Firma')
                            .replace(/vorname/g, 'Vorname')
                            .replace(/nachname/g, 'Nachname')
                            .replace(/strasse/g, 'Strasse')
                            .replace(/plz/g, 'PLZ')
                            .replace(/ort/g, 'Ort')
                            .replace(/land/g, 'Land')
                            .replace(/telefon/g, 'Telefon')
                            .replace(/handy/g, 'Handy')
                            .replace(/email/g, 'E-Mail')
                            .replace(/produkt/g, 'Produkt')
                            .replace(/menge/g, 'Menge')
                            .replace(/preis/g, 'Preis')
                            .replace(/bemerkung/g, 'Bemerkung')
                            .replace(/subartikel/g, 'Unterartikel');
      // Spezialbehandlung für Array-Werte (z.B. Checkboxen)
      if (Array.isArray(value)) {
        value = value.join('<br>'); // Füge Array-Elemente mit Zeilenumbruch zusammen
      }

      // Füge Zeile zur HTML-Tabelle hinzu
      htmlContent += `
                        <tr>
                            <td>${displayKey}</td>
                            <td>${value}</td>
                        </tr>
      `;
    }
  }

  htmlContent += `
                    </tbody>
                </table>
                <p>Mit freundlichen Grüssen,</p>
                <p>Stiftung David Dienst Email System</p>
                <p>Erstellt von Shriniketan Muthukumaran</p>
            </div>
            <div class="footer">
                <p>Dies ist eine automatisch generierte E-Mail. Bitte antworten Sie nicht direkt auf diese Nachricht.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return htmlContent;
}

module.exports = { createEmailHtml };