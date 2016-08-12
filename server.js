var express = require('express');
var app = express();

app.get('/', function (req, res) {
    //res.send("express server again");
    res.json({
        name: "fairyqiqi",
        age: 18
    });
})

app.listen(7777);