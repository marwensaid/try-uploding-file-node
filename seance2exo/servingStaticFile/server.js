var express = require('express');
var app = express();

app.use(express.static('public'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/', function (req, res, next) {
    var html = '<p>got home page</p>';
    res.send(html);
});

module.exports = app;

app.get('/read', function (req, res, next) {
    // get all entities from db
    var html = '<p>read everything from db</p>';
    res.send(html);
});

app.get('/read/:id', function (req, res, next) {
    // get indicated entity from db
    var html = '<p>read ' + req.params.id + ' from db</p>';
    res.send(html);
});

app.get('/create', function (req, res, next) {
    var html = '<form method="post" action="/created">' +
               '<div><input type="text" name="something" placeholder="something"></div>' +
               '<div><input type="submit" value="go"></div>' +
               '</form>';
    res.send(html);
});

app.post('/created', urlencodedParser, function (req, res, next) {
    // parse form, create new entity, insert new entity into db
    var html = '<p>created new ' + req.body.something + ' in db</p>';
    res.send(html);
});

app.get('/delete/:id', function (req, res, next) {
    if (req.path == '/delete') {
       next();
    }
    // remove indicated entity from db
    var html = '<p>deleted ' + req.params.id + ' from db</p>';
    res.send(html);
});

app.get('/delete', function (req, res, next) {
    var html = '<form method="post" action="/deleted">' +
               '<div><input type="text" name="something" placeholder="delete something"></div>' +
               '<div><input type="submit" value="go"></div>' +
               '</form>';
    res.send(html);
});

app.post('/deleted',urlencodedParser , function (req, res, next) {
    // parse form and remove indicated entity from db
    var html = '<p>deleted ' + req.body.something + ' from db</p>';
    res.send(html);
});

app.get('/update/:id', function (req, res, next) {
    var html = '<form method="post" action="/updated">' +
               '<div>' + req.params.id +
                   ': <input type="text" name="something" placeholder="something"></div>' +
               '<input type="hidden" name="id" value="' + req.params.id + '">' +
               '<div><input type="submit" value="go"></div>' +
               '</form>';
    res.send(html);
});

app.post('/updated',urlencodedParser , function (req, res, next) {
    // parse form and insert updated entity into db
    var html = '<p>edited and updated ' + req.body.id + ' : ' + req.body.something + ' in db</p>';
    res.send(html);
});
 

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})