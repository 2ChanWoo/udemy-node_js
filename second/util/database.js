const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'udemy_schema',
    password: 'cksdnR23'
});

module.exports = pool.promise();