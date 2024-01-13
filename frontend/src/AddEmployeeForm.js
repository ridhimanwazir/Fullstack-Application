import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeForm = ({ refreshTable }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required fields are undefined or empty
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.age.trim() ||
      !formData.email.trim()
    ) {
      console.error('Please fill in all required fields.');
      return;
    }

    // Send a POST request to add a new employee
    axios.post('http://54.234.85.114:3001/api/employees', formData)
      .then(() => {
        // Refresh the table after adding a new employee
        refreshTable();
        // Clear the form data
        setFormData({
          first_name: '',
          last_name: '',
          age: '',
          email: '',
        });
      })
      .catch(error => console.error('Error adding employee:', error.message));
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
