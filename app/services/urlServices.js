var UrlModel = require('../models/urlModel');

var longToShortMap = new Map();
var shortToLongMap = new Map();

var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for (var k = i; k <= j; k++) {
        arr.push(String.fromCharCode(k));
    }

    return arr;
};

var encode = function () {
    var encodeArr = [];
    encodeArr = encodeArr.concat(genCharArray('0', '9'));
    encodeArr = encodeArr.concat(genCharArray('A', 'Z'));
    encodeArr = encodeArr.concat(genCharArray('a', 'z'));
    return encodeArr;
}();

function ConvertTo62(num) {
    var result = '';
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num > 0);

    return result;
}

function ConvertToInt(shortUrl) {
    var length = shortUrl.length;
    var shortUrlInNumber = 0;
    for (var i = 0; i < length; i++) {
        var encodingLength = encode.length;
        var c = shortUrl.charAt(i);
        var index = encode.indexOf(c);
        shortUrlInNumber += index * Math.pow(encodingLength, length-i-1);
    }
    return shortUrlInNumber;
}

function getShortUrl(reqLongUrl, callback) {
    var longUrl = enrichLongUrl(reqLongUrl);

    UrlModel.findOne({ longUrl: longUrl }, function (err, url) {
        //TODO: handle error
        if (url) {
            callback({
                longUrl: longUrl,
                shortUrl: ConvertTo62(url.shortUrlInNumber)
            });
        } else {
            generateShortUrl(function (shortUrlInNumber) {
                var url = new UrlModel({
                    longUrl: longUrl,
                    shortUrlInNumber: shortUrlInNumber
                });
                url.save();
                callback({
                    longUrl: longUrl,
                    shortUrl: ConvertTo62(shortUrlInNumber)
                });
            });
        }
    });
}

function enrichLongUrl(longUrl) {
    if (!longUrl) return longUrl;
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }
    return longUrl;
}

function generateShortUrl(callback) {
    UrlModel.find({}, function (err, urls) {
        //TODO: handle error
        callback(urls.length);
    });
}

function getLongUrl(shortUrl, callback) {
    var shortUrlInNumber = ConvertToInt(shortUrl);
    UrlModel.findOne({ shortUrlInNumber : shortUrlInNumber}, function (err, url) {
        //TODO: handle error
        if (url){
            callback({
                longUrl: url.longUrl,
                shortUrl: shortUrl
            });
        } else {
            callback(url)
        }
    });
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};