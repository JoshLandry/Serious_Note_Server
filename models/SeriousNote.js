'use strict';

var mongoose = require('mongoose');

var seriousNoteSchema = new mongoose.Schema({
	noteText: String,
	noteAudio: String,
	deliveryMethod: String
});

module.exports = mongoose.model('SeriousNote', seriousNoteSchema);