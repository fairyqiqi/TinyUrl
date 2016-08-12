var express = require('express');
var app = express();
var insertRouter = require('./routes/insert');
var redirectRouter = require('./routes/redirect');

app.use('/api/v1', insertRouter);
app.use('/:shortUrl', redirectRouter);

app.listen(7777);