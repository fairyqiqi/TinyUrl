var express = require('express');
var router = express.Router();

var urlService = require('../services/urlServices');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1); // url looks like "/xxxx", need to skip "/"
    var longUrl = urlService.getLongUrl(shortUrl);
    if (longUrl != null) {
        res.redirect(longUrl);
    } else {
        res.json({
            "Error": "404",
            "ErrorMsg": "Cannot find the corresponding long URL"
        });
    }
});

module.exports = router;