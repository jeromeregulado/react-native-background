var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res){
	res.sendFile(path.normalize(__dirname + '/dummy.json'))
});

app.listen(3000);
console.log('API listens at port 3000');