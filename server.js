'use strict';
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');

mongoose.connect('mongodb://localhost/seriousnotesapp_development');

var app = express();
var seriousNotesRouter = express.Router();

routes(seriousNotesRouter);

app.use('/api/v1', seriousNotesRouter);

app.listen(3000, function () {
	console.log('server listening on port ' + 3000);
});