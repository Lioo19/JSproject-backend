var express = require('express');
var router = express.Router();

var h2 = `Me-sida för JSRamverk`;
var h4 = `Välkommen till min me-sida för kursen JavaScript-baserade webbramverk, JSRamverk,
            som ges vid Blekinge Tekniska Högskola hösten av kaosåret 2020.`;
var p1 = `Så vem är då jag?`;
var p2 = `Tjoppps`;
var i1 = `Linnéa O`;

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: {
                h2: h2,
                h4: h4,
                p1: p1,
                p2: p2,
                i1: i1
            }
        }
    };

    res.json(data);
});

module.exports = router;
