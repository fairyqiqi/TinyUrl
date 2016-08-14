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


function enrichLongUrl(longUrl) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }
    return longUrl;
}

function getShortUrl(reqLongUrl) {
    var longUrl = enrichLongUrl(reqLongUrl);
    if (longToShortMap.has(longUrl)) {
        var shortUrlInNumber = longToShortMap.get(longUrl);
        shortUrl = ConvertTo62(shortUrlInNumber);
    } else {
        var size = longToShortMap.size;
        shortUrl = ConvertTo62(size);
        longToShortMap.set(longUrl, size);
        shortToLongMap.set(size, longUrl);
    }
    return shortUrl;
}

function getLongUrl(shortUrl) {
    var shortUrlInNumber = ConvertToInt(shortUrl);
    if (shortToLongMap.has(shortUrlInNumber)) {
        return shortToLongMap.get(shortUrlInNumber);
    } else {
        return null;
    }
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};