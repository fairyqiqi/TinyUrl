var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log("server started");

    if (req.url === '/') {
        res.writeHead(200, {"Content-Type": "text-html"});
        //res.write("hello there!")
        var html = fs.readFileSync(__dirname + '/index.html');
        res.end(html);
    }

    if (req.url === '/api') {
        res.writeHead(200, {"Content-Type": "application/json"});
        var obj = {
            name: "fairyqiqi",
            location: "Hong Kong"
        }
        res.end(JSON.stringify(obj));
    }

}).listen(7777);