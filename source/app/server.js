var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var mongoose = require('mongoose');

mongoose.connect('mongodb://tinyurluser:tinyurluser@ds013206.mlab.com:13206/tinyurl');

app.use('/', indexRouter);
app.use('/public', express.static(__dirname + "/public"));
app.use('/api/v1', restRouter);
app.use('/:shortUrl', redirectRouter);

app.listen(7777);