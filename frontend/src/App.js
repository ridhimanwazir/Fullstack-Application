import React from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployeeForm from './AddEmployeeForm';

const App = () => {
  const refreshTable = () => {
    // Implement a function to refresh the employee table
    // This function can be passed as a prop to child components
  };

  return (
    <div>
      <EmployeeTable />
      <AddEmployeeForm refreshTable={refreshTable} />
    </div>
  );
};

export default App;
