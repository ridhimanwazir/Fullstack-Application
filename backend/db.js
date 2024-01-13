const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'emplyee-info.cn882w80iku6.us-east-1.rds.amazonaws.com',
   user: 'ridhiman',
   password: 'bunny1996',
   database: 'employee_db',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

module.exports = pool.promise();
