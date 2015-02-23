# Express_REST_API by Josh Landry
This is a simple REST API that uses the Express module and MongoDB as a backend.

It is designed to work with the 'goats' resource, and your posts will be saved to a new database called "goatsapp_development".

First, run mongod using `mongod --dbpath=./db --smallfiles` in the cloned repo of this app.  Then, start the server with node using the command `node server.js`.  Then, send the server requests using Superagent or something similar (`supergent localhost:3000/api/v1/goats` for get, et cetera).

Your posts must follow the format {goatSays: "I can talk im a goat", goatHandler: "who keeps a leashed goat"} to fit into the 'goat' schema.

You can also run the command `Grunt` to run both the jshint style checker and mocha/chai-http tests that check the functionality of the route handlers.