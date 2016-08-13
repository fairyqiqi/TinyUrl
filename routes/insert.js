var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var longToShortMap = new Map();
var shortToLongMap = new Map();

var encode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
              'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
              'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function recursiveFunc (x, result) {
    var v = Math.floor(x/62);
    var m = x % 62;
    var tempResult = encode[m] + result;
    if (v == 0) {
        return tempResult;
    } else if (v > 0 && v < 62){
        return encode[v] + tempResult;
    } else if (v >= 62) {
        return recursiveFunc(v, tempResult);
    }
}

function ConvertTo62(size) {
    var size1 = 25500;
    return recursiveFunc(size1, "");
}
function CreateShortUrl() {
    var shortUrl = ConvertTo62(longToShortMap.size);
    return shortUrl;
}

router.post('/urls', jsonParser, function (req, res) {
    var longUrl = req.body.longUrl; //longUrl is defined in json body
    if (longToShortMap.has(longUrl)){
        shortUrl = longToShortMap.get(longUrl);
    } else {
        shortUrl = CreateShortUrl();
        longToShortMap.set(longUrl, shortUrl);
        shortToLongMap.set(shortUrl, longUrl);
    }
    res.json({
        "shortUrl": shortUrl,
        "longUrl": longUrl
    });
});

module.exports = router;