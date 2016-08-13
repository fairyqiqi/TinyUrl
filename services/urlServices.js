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
    return recursiveFunc(size, "");
}

function enrichLongUrl(longUrl) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }
    return longUrl;
}

function getShortUrl(reqLongUrl) {
    var longUrl = enrichLongUrl(reqLongUrl);
    if (longToShortMap.has(longUrl)) {
        shortUrl = longToShortMap.get(longUrl);
    } else {
        shortUrl = ConvertTo62(longToShortMap.size);
        longToShortMap.set(longUrl, shortUrl);
        shortToLongMap.set(shortUrl, longUrl);
    }
    return shortUrl;
}

function getLongUrl(shortUrl) {
    if (shortToLongMap.has(shortUrl)) {
        var longUrl = shortToLongMap.get(shortUrl);
        return longUrl;
    } else {
        return null;
    }
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};