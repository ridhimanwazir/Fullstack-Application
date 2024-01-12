const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Change this line

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'emplyee-info.cn882w80iku6.us-east-1.rds.amazonaws.com', // Replace with your RDS endpoint
  user: 'ridhiman',
  password: 'bunny1996',
  database: 'emplyee-info',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// CRUD Operations

// Example: Get all items
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

// Example: Add new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO items (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId });
  });
});

// Example: Delete an item
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
