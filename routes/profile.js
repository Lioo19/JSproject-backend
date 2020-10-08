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

//for nothing
router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "This message isn't going anywhere..."
        }
    };

    res.json(data);
});

//behöver ses över hur den returnerar svaret
router.get("/:username", (req, res) => {
    db.each("SELECT * FROM objects WHERE user = " + req.params.username,
        function(err, row) {
            const data = {
                data: {
                    nr: row.nr,
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

//ROUTE AND FUNCTION FOR UPDATE
router.put("/edit/:which",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => updatepost(res, req.body));

function updatepost(res, body) {
    const reportId = body.reportId;
    const rtext = body.rtext;


    db.run(`UPDATE reports SET reporttext = ? WHERE reportnr = ?`,
        rtext,
        reportId, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "Database error",
                        detail: "Uppdatering misslyckades"
                    }
                });
            }
            return res.status(201).json({
                data: {
                    msg: "Report successfully updated"
                }
            });
        });
}

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => newpost(res, req.body));

function newpost(res, body) {
    const reportId = body.reportId;
    const rtext = body.rtext;


    db.run("INSERT INTO reports (reportnr, reporttext) VALUES (?, ?)",
        reportId,
        rtext, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "Database error",
                        detail: "Rapport existerar redan"
                    }
                });
            }
            return res.status(201).json({
                data: {
                    msg: "Report successfully created!"
                }
            });
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
                    detail: "Logga in för att skapa ny post"
                }
            });
        }
        //valid token send on the request to next function
        next();
    });
}

module.exports = router;
