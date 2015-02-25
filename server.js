'use strict';
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var http = require('http');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/seriousnotesapp_development');

var app = express();
var seriousNotesRouter = express.Router();

routes(seriousNotesRouter);

app.use('/api/v1', seriousNotesRouter);

app.listen(process.env.PORT || 3000, function () {
	console.log('server listening on port ' + (process.env.PORT || 3000));
});