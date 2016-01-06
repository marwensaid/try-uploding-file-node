var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8085, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Serveur écoute sur http://%s:%s", host, port)
})

// This responds to a GET request with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds to a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

// routing
app.get(/\/track\/(\w+)\/(?:sound|visualisation)\/((\w|.)+)/, 
     function (req, res) {
          res.sendfile(__dirname + '/' + TRACKS_PATH + req.params[0] 
                       + '/' + req.params[1]);
})

app.get('/track/:id', function (req, res) {
   var id = req.params.id; // vaut HighwayToHell

   // Faire quelque chose avec id, aller chercher l'objet dans une BD
   // etc...
})

app.get('/track/:id', function (req, res) {
   var id = req.params.id;     // params pour chemin dans URL
   var format = req.query.format; // query pour params HTTP

   // Faire quelque chose avec id et la valeur du format, 
   // aller chercher l'objet dans une BD
   // etc...
});