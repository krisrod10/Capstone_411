const db = require("../db/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require('dotenv').config();

let login = (req,res) => {
    console.log("Login Route: ", req.body.username);

    // get the username and password from request
    const username = req.body.username;
    const password = req.body.password;

    let sql = 'SELECT id, username, password_hash, role FROM usersLogin WHERE username = ?';

    let params = [];
    params.push(username);

    // select username role and stored hash from the db for the user to be passed in
    db.query(sql, params, (error,rows) => {
        let goodPassword = false;
        let role;

        // if the database failed then log an error
        if(error){
            console.log("Error when querying the db", error);
        }

        // if the database returned too many rows then log the error
        if(rows.length > 1){
            console.error("Found to many rows with the username", username);
        }

        if(rows.length == 0){
            console.log("Did not find a row with this username", username);
        }

        // if the query ran with out a error and only 1 row came back,
        // then check the stored hash against the password provided in the request
        if(!error && rows.length == 1){
            row = rows[0];

            // get the stored hash from the database
            let hash = row.password_hash;

            // get the role form the data base
            role = row.role;

            // check that the hash in the database matches the password provided 
            goodPassword = bcrypt.compareSync(password,hash);

        }

        if(goodPassword){
            const unsignedToken = {
                username: username,
                role: role
            };
            // sign the token using the jwt secret
            let jwtSecret = process.env.jwtSecret;
            const accessToken = jwt.sign(unisngedToken, jwtSecret);

            // send the signed token back
            res.json({
                toke: accessToken,
                user: row
            });
        } else {
            res.status(401).send("Unauthorized");
        }
    });
}

let authCheck = (req, res) => {
    console.log("Successful Authorization Granted");
    res.json("Successfully passed the authorization check", `${req.username}`);
}

module.exports = {login, authCheck}