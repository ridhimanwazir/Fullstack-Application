import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from your backend when the component mounts
    axios.get('http://54.234.85.114:3001/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error.message));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to remove the employee
    axios.delete(`http://54.234.85.114:3001/api/employees/${id}`)
      .then(() => {
        // Refresh the table after deleting an employee
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('Error deleting employee:', error.message));
  };

  return (
    <div>
      <h2>Employee Table</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{employee.first_name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{employee.last_name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{employee.age}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{employee.email}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
