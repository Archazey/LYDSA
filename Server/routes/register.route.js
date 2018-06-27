const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const pool = db.getPool();

// login the user
router.post('/register', (req, res) => {
    let username = req.body.username, password = req.body.password;
    let email = req.body.email, gender = req.body.gender, role = req.body.role;
    let registerSuccess = true;

    async function updateTable() {
        let role_id;
        await pool.query('SELECT id FROM ROLES WHERE role=$1', [role.toString().toLowerCase()])
            .then(response => {
                role_id = response.rows[0].id;
            })
            .catch(err => {
                console.error(err.stack);
                registerSuccess = false;
            }); 
        await pool.query(`INSERT INTO Users(username, password, role_id) VALUES ($1, $2, $3)`, [username, password, role_id])
            .catch(err => {
                console.error(err.stack);
                registerSuccess = false;
            });
        let user_id;
        await pool.query('SELECT id FROM USERS WHERE username = $1', [username])
            .then(response => {
                user_id = response.rows[0].id;
            })
            .catch(err => {
                console.error(err.stack);
                registerSuccess = false;
            });
        await pool.query('INSERT INTO Profile(user_id, email, gender) VALUES ($1, $2, $3)', [user_id, email, gender])
            .catch(err => {
                console.error(err.stack);
                registerSuccess = false;
            });
    }

    updateTable().then(ressponse => {
        if (registerSuccess == false)
            res.status(400).send();
        else
            res.status(200).send();
    });
});

module.exports = router;