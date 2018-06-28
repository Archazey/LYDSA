const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const pool = db.getPool();

// get user data
router.get('/profile/:user', async (req, res) => {
    let username = req.params.user;
    let user_id;
    await pool.query('SELECT id FROM USERS WHERE username = $1', [username]).then(response => {
        user_id = response.rows[0].id;
    });
    await pool.query('SELECT * FROM PROFILE WHERE user_id = $1', [user_id]).then(response => {
        res.status(200).send(response.rows[0]);
    });
});

// save profile
router.post('/profile/:user', async (req, res) => {
    let username = req.params.user;
    let email = req.body.email, gender = req.body.gender, bio = req.body.bio;
    let user_id;
    await pool.query('SELECT id FROM USERS WHERE username = $1', [username]).then(response => {
        user_id = response.rows[0].id;
    });
    await pool.query('UPDATE PROFILE SET email = $1, gender = $2, bio = $3 WHERE user_id = $4', [email, gender, bio, user_id])
        .then(response => res.status(200).send())
        .catch(error => {
            console.log(error.stack);
            res.status(400).send()
        });
});

module.exports = router;