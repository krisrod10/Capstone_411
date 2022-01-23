const db = require('../db/db');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    console.log('Get all users route.');

    let sql = 'SELECT * FROM users411';

    db.query(sql, (error, results) => {
        if (error) {
            console.log('Failed to return all users.');
            res.sendStatus(500);
        } else {
            console.log('Users: ', results);
            res.json(results);
        }
    })
  }
  
const getUserById = (req, res) => {
    console.log('Get user by id route. ', req.params.id);

    let id = req.params.id;

    let sql = "SELECT * FROM users411 WHERE id = ?";

    db.query(sql, id, (error, results) => {
        if (error) {
            console.error("Error when fetching user by id", error);
            res.sendStatus(500);
        } else if (rows.length > 1) {
            console.error("Too may users returned for the id ", id);
            res.sendStatus(500);
        } else if (rows.length == 0) {
            console.error(`No user for id ${id} found`);
            res.status(401).json(null);
        } else if ( rows.length == 1){
            res.json(rows[0]);
        }
    })
}

let createUser = (req, res) => {
    console.log("POST/createUser ", req.body.username);
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    // make sure that the password and confirm password are the same
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    // generate the hash of the password that will be stored in the database
    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = 'INSERT INTO users411(username, password_hash, role) values(?, ?, ?);';

    db.query(sql, [username, passwordHash, 'user'], (error, rows) => {
        // if the insert query returned an error, we log the error
        // and return a failed message back
        if (error) {
            console.error("Failed to add user", error);
            res.status(500).send("Failed to add user");
        } else {
            // if the insert statement ran without an error then the user was created
            res.send("User Created");
        }
    })
}

const updateUser = (req, res) => {
    console.log('Update user route.');
    
    let id = req.params.id;
    let password = req.body.password;

    // generate the hash of the password that will be stored in the database
    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = "UPDATE users411 SET password_hash = ? WHERE id = ?";

    db.query(sql, [passwordHash, id], (error, results) => {
        if (error) {
            console.log(`Failed to update user with id ${id}.`, error);
            res.sendStatus(500);
        } else {
            console.log('User successfully updated!');
            res.sendStatus(204);
        }
    })
}

const deleteUser = (req, res) => {
    console.log('Delete user route.');

    let id = req.params.id;

    let sql = 'DELETE FROM users411 WHERE id = ?';

    db.query(sql, id, (error, results) => {
        if (error) {
            console.log(`Failed to delete user with id ${id}.`, error);
            res.sendStatus(500);
        } else {
            console.log('User successfully deleted!');
            res.sendStatus(204);
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}