var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');

app.use('/public', express.static(__dirname + "/public"));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);
app.use('/:shortUrl', redirectRouter);

app.listen(7777);