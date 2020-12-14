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

let cookieDb = {}

cookieDb.all = () => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cookieDb.getUser = (id) => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users where user_id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

cookieDb.getUserbyMail = (email) => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users where email = ?`, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cookieDb.insertUser = (user, hashPass) => {

    // console.log(user.fname);
    return new Promise((resolve, reject) => {
        dbPool.query(`INSERT INTO users (first_name, last_name,user_name,password,email) VALUES (?,?,?,?,?)`, [user.fname, user.lname, user.userName, hashPass, user.email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cookieDb.updateUser = (reqBody) => {

    // console.log(user.fname);
    return new Promise((resolve, reject) => {
        dbPool.query(`update users set first_name = ?, last_name = ?,user_name = ?,email = ? where user_id = ? `
            , [reqBody.first_name, reqBody.last_name, reqBody.user_name, reqBody.email, reqBody.user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
};

cookieDb.updateLogInfo = (user_id) => {

    // console.log( user_id);
    return new Promise((resolve, reject) => {
        dbPool.query(`insert into loginfo (user_id) values (?)`, [user_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

