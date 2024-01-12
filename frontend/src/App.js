import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    // Fetch all items from the backend
    axios.get('/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleAddItem = () => {
    // Add a new item to the backend
    axios.post('/api/items', { name: itemName })
      .then(response => {
        setItems([...items, { id: response.data.id, name: itemName }]);
        setItemName('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const handleDeleteItem = (id) => {
    // Delete an item from the backend
    axios.delete(`/api/items/${id}`)
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
