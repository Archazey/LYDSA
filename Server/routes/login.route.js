const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const pool = db.getPool();

// login the user
router.post('/login', (req, res) => {
     if (req.body.username && req.body.password){
        let username = req.body.username, password = req.body.password;
        pool.query(`SELECT username, password FROM USERS WHERE username=$1 AND password=$2`, [username, password])
            .then(result => {
                if (result.rows.length == 0) 
                    res.status(401).send('Incorrect credentials!');
                else 
                    res.status(200).send('Correct credentials!');
            })
            .catch(err => console.error(err.stack));
     }
});

module.exports = router;