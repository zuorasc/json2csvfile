#!/usr/bin/env node
var argv = require('optimist').argv;
var fs = require("fs");
try{
	var inFile = argv._[0];
	var outFile = argv._[1];
	if(!inFile || !outFile){
		throw new Error("Arguments not properly defined.")
	}
	var json = JSON.parse(fs.readFileSync(inFile).toString());
	var keys = Object.keys(json[0]);
	var file = fs.createWriteStream(outFile);
	file.once('open',function(){
		file.write(keys.join(',') + '\n');
		for(var i = 0; i < json.length; i++){
			var row = [];
			for(var j = 0; j < keys.length; j++){
				row.push(json[i][keys[j]]);
			}
			file.write(row.join(',')+'\n');
		}
		file.end();
		console.log(outFile + " successfully written. You're welcome ;)");
	})
}catch(error){
	console.log(error.message);
}