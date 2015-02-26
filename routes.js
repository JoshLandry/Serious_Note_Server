'use strict';
var SeriousNote = require('./models/SeriousNote');
var bodyparser = require('body-parser');

module.exports = function (router) {

	// router.use(bodyparser.json());
	router.use(bodyparser.json({limit: '50mb'}));

	router.get('/seriousnote/:reminderID', function(req,res) {
		SeriousNote.findOne({reminderID: req.params.reminderID}, function(err, data) {
			if(err) return res.status(500).send({'msg': 'There was an error retrieving your notes.'});
			res.json(data);
		});
	});

	router.post('/seriousnote', function(req,res) {
		var newNote = new SeriousNote(req.body);
		newNote.save(function(err, note) {
			if (err) return res.status(500).send({'msg': 'Your note could not be saved.'});
			res.json(note);
		});
	});

	router.put('/seriousnote/:id', function(req, res) {
	    var updatedNote = req.body;
	    delete updatedNote._id;
	    SeriousNote.update({_id: req.params.id}, updatedNote, function(err) {
	      if (err) return res.status(500).send({'msg': 'This note has proved resistant to update.'});

	      res.json(req.body);
	    });
	});

	router.delete('/seriousnote/:id', function(req, res) {
    	SeriousNote.remove({_id: req.params.id}, true);
    	res.end();
  	});

};
