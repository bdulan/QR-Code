var express = require('express'),
http = require('http'),
http_req = require('http-request'),
fs = require('fs');

var app = express();
var array = fs.readFileSync('sampledata.txt').toString().split("\n"); // Read data in  to parse
//var options = {url: 'http://api.qrserver.com/v1/create-qr-code/?data=Breakfast%20agreeable,%20incommode%20departure,%20it%20an.,&size=100x100'};
var options = {url: 'https://www.google.com/images/srpr/logo3w.png'};
//GET Function
app.get('/',function(req,res) {
  //var html = buildHtml(req); // load the html and image file
http_req.get(options, '~/Desktop/app/images/oops.jpg', function (error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log('File downloaded correctly.');
    }
  });
  console.log('Download Complete...');
  res.send('File downloaded at: ') // sending the HTML to the server;
})

//Server Created for the HTML PAGE

app.post('/', function(req, res) {
  alert('You sent the name "' + req.body.name + '".');
  res.send('You sent the name "' + req.body.name + '".');
});

var server = app.listen(8000, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('This app is listeing at http://%s:%s', host, port)

})
