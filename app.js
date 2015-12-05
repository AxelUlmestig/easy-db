/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var request = require('request');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/*Parsing req.body*/
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// Load the Cloudant library.
var Cloudant = require('cloudant');
var cloudantService = appEnv.getService("Cloudant NoSQL DB-8c");
var me = cloudantService.credentials.username; // Set this to your own account
var password = cloudantService.credentials.password;

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
app.post("/store-data", function(req, res){

  var data = {
    value: req.body
  }

  console.log(data.value);

  /*Store to cloudant*/
  var datadb = cloudant.db.use('data');
  datadb.insert(data, function(err, body, header) {
      if (err) {
        return console.log('[data.insert]', err.message);
      }

      console.log('You have inserted the data.');
      console.log(body);
      res.send(body);
    });
})

app.get("/documents", function(req,res){

  var datadb = cloudant.db.use('data');
   /*Hämta skit*/

})

app.get("/categories", function(req, res){
	var url = "https://1f44b41b-80fc-4a8c-85bf-f1dca83d75f5-bluemix.cloudant.com/data/categories";
	request(url, function(error, response, body) {
		res.send(body);
	});
	//res.send({categories: ["footsize"]})
})

app.post("/query", function(req, res) {
	//var url = 
})



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
