require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// GET /healthcheck — vérifie la connexion à la base de données
app.get('/healthcheck', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'unreachable', message: err.message });
  }
});

// GET /users — récupère tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nom, mail FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Exporter l'app pour les tests
module.exports = app;

// Ne démarrer le serveur que si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
