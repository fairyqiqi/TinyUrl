var express = require('express');
var router = express.Router();

var insertRouter = require('./insert');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1); // url looks like "/xxxx", need to skip "/"
    if (insertRouter.shortToLongMap.has(shortUrl)) {
        var longUrl = insertRouter.shortToLongMap.get(shortUrl);
        res.redirect(longUrl);
    } else {

    }
});

module.exports = router;