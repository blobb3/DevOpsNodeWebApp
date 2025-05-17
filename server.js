'use strict';
const express = require('express');
// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
// App
const app = express();

// Ein kleines Easter Egg
let visitors = 0;

app.get('/', (req, res) => {
  visitors++;
  
  // Kleine Überraschung nach jeder 9. Anfrage
  const isRingbearer = visitors % 9 === 0;
  
  res.send(`
    <html>
      <head>
        <title>DevOps Container</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
            background-color: ${isRingbearer ? '#ffd700' : '#f5f5f5'};
            transition: background-color 1s;
          }
          h1 {
            color: #333;
          }
          .message {
            font-size: 18px;
            margin: 20px;
          }
          .secret {
            font-size: 12px;
            color: ${isRingbearer ? '#cc0000' : '#f5f5f5'};
            font-family: 'Courier New', monospace;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <h1>FS2025 DevOps Container</h1>
        <div class="message">Greetings, traveler! Welcome to our humble server.</div>
        <p>Dies ist ein Test für den DevOps-Kurs :-D .</p>
        <p>Besucher: ${visitors}</p>
        <div class="secret">${isRingbearer ? 'Ein Server sie zu hosten, ein Code sie zu finden, eine CI/CD-Pipeline sie zu bringen, und in der Produktion sie zu binden.' : 'Sprich "Freund" und tritt ein'}</div>
      </body>
    </html>
  `);
});

// Geheimer Pfad für Kenner
app.get('/mellon', (req, res) => {
  res.send('Die Tore von Moria haben sich geöffnet! Willkommen im DevOps-Zwergenreich.');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);