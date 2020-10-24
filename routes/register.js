let express = require('express');
let router = express.Router();
const cors = require('cors');

// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");

const bcrypt = require('bcryptjs');
const saltRounds = 10;
app.use(cors());


router.get('/', function() {
    console.log("");
});

router.post("/", (req, res) => {
    register(res, req.body);
});

function register(res, body) {
    const email = body.email;
    const password = body.password;
    const username = body.username;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
            email,
            hash,
            username, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/login",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                return res.status(201).json({
                    data: {
                        message: "Registration successful!"
                    }
                });
            });
    });
}


module.exports = router;
