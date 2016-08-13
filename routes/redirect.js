var express = require('express');
var router = express.Router();

var urlService = require('../services/urlServices');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1); // url looks like "/xxxx", need to skip "/"
    var longUrl = urlService.getLongUrl(shortUrl);
    if (longUrl != null) {
        res.redirect(longUrl);
    } else {

    }
});

module.exports = router;