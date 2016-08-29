var express = require('express');
var router = express.Router();

var urlService = require('../services/urlServices');
var statsService = require('../services/statsService');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1); // url looks like "/xxxx", need to skip "/"
    var longUrl = urlService.getLongUrl(shortUrl, function (url) {
        if (url){
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.sendFile('public/views/404.html', {root: './'});
        }
    });
});

module.exports = router;