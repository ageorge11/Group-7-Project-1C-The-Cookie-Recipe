const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    console.log("Register User : " + JSON.stringify(req.body));

    const { name, email, password, pswRepeat } = req.body;

    try {
        let user = await db.getUserbyMail(email);

        if (user.length > 0) {
            res.status(401).json({
                message: "User Registration Failed - Email Already in Use"
            });
            console.log('Email exist :' + email)
        }
        else {
            let hashedPassword = await bcrypt.hash(password, 3);
            //console.log(hashedPassword);
            let op = await db.insertUser(req.body, hashedPassword);
            res.status(201).json({
                message: "User Registration Success"
            });
        }
    } catch (e) {
        console.log(e)
    }
}

exports.update = async (req, res) => {
    console.log("Update User : " + JSON.stringify(req.body));

    const { user_id,first_name, last_name,user_name,email } = req.body;

    try {
        let user = await db.getUserbyMail(email);
        let update = true;

        user.forEach(element => {
           if(element.user_id != user_id){
            update = false;
           } 
           
        });

        if (!update) {
            res.status(401).json({
                message: "User updation Failed - Email Already in Use"
            });
            console.log('Email exist :' + email)
        }
        else {
            let op = await db.updateUser(req.body);
            res.status(201).json({
                message: "User Updation Success"
            });
        }
    } catch (e) {
        console.log(e)
    }
}



exports.login = async (req, res) => {
    console.log("User Login : "+ JSON.stringify(req.body));

    const { email, password } = req.body;

    try {
        let user = await db.getUserbyMail(email);
        //console.log(user[0]);
        if (user.length > 0) {
            if (await bcrypt.compare(password, user[0].password)) {

                const id = user[0].user_id;
                const token = jwt.sign({ id: id, username: user[0].user_name }, 'secretpassword', {
                    expiresIn: '30d'
                });

                res.status(200).json({
                    message: "Auth success",
                    token: token,
                    user: user[0]
                })

                db.updateLogInfo(user[0].user_id);

                console.log("Log in Success");
            }
            else {
                res.status(401).json({
                    message: "Auth Failed - Password not Correct"
                });
                console.log("password not correct");
            }
        }
        else {
            res.status(401).json({
                message: "Auth Failed - Email not Correct"
            });
            console.log("email not exist");
        }
    } catch (e) {
        console.log(e);
    }
}

exports.forgotPass = async (req, res) => {
    console.log("Forgot Pass " + JSON.stringify(req.body));

}

exports.logHistory = async (req, res) => {
    console.log("LogHistory :" + JSON.stringify(req.body));
    const { user_id } = req.body;

    history = await db.getLogHistory(user_id);

    if (history) {
        //console.log(history);
        res.status(201).json({
            history
        });
    }
    else {
        console.log("Error : No history " + user_id);
        res.status(404).json({
            message :"No History"
        });
    }


}

exports.getUser = async (req, res) => {
    // console.log("Get User : "+JSON.stringify(req.body));
    const { user_id } = req.body;

    // console.log("checking ");
    // console.log(user_id);

    user = await db.getUser(user_id);
    if (user) {
       // console.log(user);
        res.status(201).json({
            user
        });
    }
    else {
        console.log("Error : No user " + user_id);
        res.status(404).json({
            message :"No User"
        });
    }
}