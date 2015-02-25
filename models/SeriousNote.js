'use strict';

var mongoose = require('mongoose');

var seriousNoteSchema = new mongoose.Schema({
	noteID: String,
	noteText: String,
	noteAudio: String,
	deliveryMethod: String
});

module.exports = mongoose.model('SeriousNote', seriousNoteSchema);