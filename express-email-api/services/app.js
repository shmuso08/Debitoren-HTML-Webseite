require('dotenv').config();
const express = require('express');
const { sendEmail } = require('./emailService');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express API is running.');
});

app.post('/submit', async (req, res) => {
  try {
    await sendEmail(req.body);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
