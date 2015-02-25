'use strict';
var SeriousNote = require('./models/SeriousNote');
var bodyparser = require('body-parser');

module.exports = function (router) {

	router.use(bodyparser.json());

	router.get('/seriousnotes/:noteID', function(req,res) {
		SeriousNote.findOne({noteID: req.params.noteID}, function(err, data) {
			if(err) return res.status(500).send({'msg': 'the goats ran off, and could not be retrieved.'});

			res.json(data);
		});
	});

	router.post('/seriousnotes', function(req,res) {
		var newNote = new SeriousNote(req.body);
		newNote.save(function(err, note) {
			if (err) return res.status(500).send({'msg': 'Your note could not be saved.'});

			res.json(note);
		});
	});

	router.put('/seriousnotes/:id', function(req, res) {
	    var updatedNote = req.body;
	    delete updatedNote._id;
	    SeriousNote.update({_id: req.params.id}, updatedNote, function(err) {
	      if (err) return res.status(500).send({'msg': 'this note has proved resistant to update.'});

	      res.json(req.body);
	    });
	});

	router.delete('/seriousnotes/:id', function(req, res) {
    	SeriousNote.remove({_id: req.params.id}, true);
    	res.end();
  	});

};