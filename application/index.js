// const { application } = require('express');
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'csc317db',
//     queueLimit: 0,
//     waitForConnections: true,
//     connectionLimit: 20
// });

// const promisePool = pool.promise();

// app.post("/users/register", function(req, res) {
//     const {username, email, password} = req.body
//     promisePool
//     .execute('insert into users (username, email, password) value (?,?,?);', ["user7", "user7@mail.com", "somepassword"])
//     .then(function([results, fields]){
//         console.log(results)
//     }) .catch(function(err){
//         console.log(err);
//     });
// });


// (async function() {
//     try{
//     const [results, fields] = await promisePool.query('select * from users;');
//     console.log(results);
//     }catch(e) {
//         console.log(e);
//     }
// })();

