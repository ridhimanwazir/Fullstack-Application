const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection module

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// CRUD Operations

// Example: Get all items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example: Add new item
app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO items (name) VALUES (?)', [name]);
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example: Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute('DELETE FROM items WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

