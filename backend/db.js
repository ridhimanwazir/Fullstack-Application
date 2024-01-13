const mysql = require('mysql2');

const pool = mysql.createPool({
   host: '127.0.0.1',
   user: 'ridhiman',
   password: 'bunny1996',
   database: 'employee_db',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

module.exports = pool.promise();
