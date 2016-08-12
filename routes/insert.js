var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/urls', jsonParser, function (req, res) {
    //TODO: implement this
    //1. get long url from req
    var longUrl = req.body.longUrl; //longUrl is defined in json body

});

module.exports = router;