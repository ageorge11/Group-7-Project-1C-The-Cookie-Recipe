const mysql = require('mysql');

const dbPool = mysql.createConnection({
    password: process.env.db_password,
    user: process.env.db_user,
    database: process.env.db_database,
    host: process.env.db_host
});

dbPool.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL Connected...")
    }
})

