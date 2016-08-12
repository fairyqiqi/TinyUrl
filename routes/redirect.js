var express = require('express');
var router = express.Router();

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1); // url looks like "/xxxx", need to skip "/"
    var longUrl = ""; //TODO: implement this
    res.redirect(longUrl);
});

module.exports = router;