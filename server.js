var path=require("path");
var express = require('express');
var app = express();

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get("/", function(req, res){
	var fileName = path.join(__dirname, 'index.html');
	res.sendFile(fileName, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', fileName);
		}
	});
});

app.get("/:time", function(req, res){
	if(!parseInt(req.params.time)){
		var date = new Date(req.params.time);
	}
	else {
		var date = new Date(parseInt(req.params.time));
	}
	
	if(date.getTime()){
		var nat=monthNames[date.getMonth()]+" "+date.getDate()+","+date.getFullYear();
		res.end(JSON.stringify({unix:date.getTime(),natural:nat}));
	}
	else {
		res.end(JSON.stringify({unix:"null",natural:"null"}));
	}
});

app.listen(3000, function(){
	console.log("Timestamp microservice running !");
});
