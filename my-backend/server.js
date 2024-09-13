const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API endpoint to get all users
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
      if (err) {
          res.status(500).send({ message: 'Error querying the database' });
      } else if (result.length > 0) {
          res.status(200).send({ message: 'Login successful' });
      } else {
          res.status(401).send({ message: 'Invalid username or password' });
      }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
