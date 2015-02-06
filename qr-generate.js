var fs = require('fs'), // I/O stuff
request = require('request'), // --- Requires ---
mkdirp = require('mkdirp'), // To make the directory
EasyZip = require('easy-zip').EasyZip;  // To zip the folder

var now = new Date();
var lines = fs.readFileSync('sampledata.txt').toString().split("\n"); // Read the data
var foldername = 'QRCodes ' + now.getHours() + ':' + now.getMinutes(); // Declare the Folder Name
mkdirp(foldername, function(err) { console.log('End of File...')}); // path was created unless there was error

// ---- Download Function ----
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']); // Let us know what the output is
    //console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback); // write to file
  });
};

for (i in lines) {  // Go through each line and split it

  var name = lines[i].split(",");
  name[0] = name[0].concat('.png').toString(); // Concatenate the first word which is the name
  if (name[0] == '') { name[0] = 'dummy';}
  var file = foldername + '/' + name[0]; //make the path
  lines[i]= lines[i] - name[0];
  console.log(lines[i]);
  var url = 'http://api.qrserver.com/v1/create-qr-code/?data='+ lines[i] + '&size=200x200';
  console.log('finished #' + i);
  download(url, file, function(){ console.log(''); }); // QRCode[i]

};

// Zip the existing folder...

var zip = new EasyZip();
zip.zipFolder(foldername,function(){
  foldername = foldername.concat('.zip').toString()
  zip.writeToFile(foldername);
  console.log('Zipped the folder as' + foldername);
});
