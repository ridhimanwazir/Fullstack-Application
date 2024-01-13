const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection module

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// CRUD Operations

// Example: Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example: Add new employee
app.post('/api/employees', async (req, res) => {
  const { first_name, last_name, email, age } = req.body; // Update variable names
  try {
    const [result] = await db.execute('INSERT INTO employees (first_name, last_name, email, age) VALUES (?, ?, ?, ?)', [first_name, last_name, email, age]);
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example: Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute('DELETE FROM employees WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
