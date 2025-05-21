const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(cors()); // Active CORS pour autoriser Wix à appeler ce backend
app.use(express.json()); // Pour parser le JSON des requêtes entrantes

app.post('/submit', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw92KD5E7r7zOTOjeP2XRxCr3ioiE4xsrEF3-mHurP9QqtkF4j1U9Tk6P_9QCpjVlTQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.send(text);
  } catch (error) {
    res.status(500).send('Erreur serveur : ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
