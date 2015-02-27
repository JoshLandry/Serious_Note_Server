'use strict';

var mongoose = require('mongoose');

var seriousNoteSchema = new mongoose.Schema({
  reminderID: Number,
  userID: Number,
  textContent: String,
  mediaType: Number,
  mediaContent: String,
  recipientID: Number,
  messageType: Number,
});

module.exports = mongoose.model('SeriousNote', seriousNoteSchema);
