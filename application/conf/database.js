const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    queryLimit: 0,
    database: 'csc317db',
    connectionLimit: 20,
    waitForConnections: true
});

const promisePool = pool.promise();

module.exports = promisePool;