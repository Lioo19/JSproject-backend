let express = require('express');
let router = express.Router();

// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");


const jwt = require('jsonwebtoken');

// route.use(bodyParser.json()); // for parsing application/json
// for parsing application/x-www-form-urlencoded
// route.use(bodyParser.urlencoded({ extended: true }));

let config;

//fetching config-file with secret key in
try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const secret = config.secret;

router.get('/', function() {
    console.log("");
});

//route for all objects that does not belong to a user
router.get('/', (req, res) => {
    db.all("SELECT nr, name, latin, img FROM objects WHERE user = 'none'",
        function(err, rows) {
            if (err) {
                return console.error(err.message);
            }
            if (rows.length === 0) {
                return res.status(status);
            }
            res.json(rows);
        }
    );
});

//route for all objects, mostly for socket
router.get('/all', (req, res) => {
    db.all("SELECT * FROM objects",
        function(err, rows) {
            if (err) {
                return console.error(err.message);
            }
            if (rows.length === 0) {
                return res.status(status);
            }
            res.json(rows);
        }
    );
});


router.get("/product/:nr", (req, res) => {
    db.each("SELECT name, latin, img, user FROM objects WHERE nr = " + req.params.nr,
        function(err, row) {
            const data = {
                data: {
                    nr: req.params.nr,
                    name: row.name,
                    latin: row.latin,
                    img: row.img,
                    user: row.user
                }
            };

            res.json(data);
        }
    );
});

//route for buying object
router.put("/buy/:nr/",
    (req, res, next) => checkToken(req, res, next),
    (req, res, next) => buyObject(res, req.body, next),
    (req, res) => updateBalance(res, req.body)
);

//use objectnumber as body to sell,
function buyObject(res, body, next) {
    const nr = body.nr;
    const who = body.who;
    const amount = parseFloat(body.amount).toFixed(2);

    db.run(`UPDATE objects
                SET user = ?,
                    boughtfor = ?
            WHERE nr = ?`,
        who,
        amount,
        nr, (err) => {
            if (err) {
                return error500(res);
            }
            next();
        });
}

function updateBalance(res, body) {
    const who = body.who;
    const amount = body.amount;

    db.run(`UPDATE users SET balance = balance - ? WHERE username = ?`,
        amount,
        who, (err) => {
            if (err) {
                return error500(res);
            }
            return res.status(201).json({
                data: {
                    msg: "Object bought and balance updated"
                }
            });
        });
}

function error500(res) {
    return res.status(500).json({
        errors: {
            status: 500,
            source: "/login",
            title: "Database error",
            detail: "Update failed"
        }
    });
}

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, function(err) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/login",
                    title: "Database error",
                    detail: "Login first"
                }
            });
        }
        //valid token send on the request to next function
        next();
    });
}

module.exports = router;
