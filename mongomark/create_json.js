var express = require( "express" );
var app = express();
var MongoClient = require( "mongodb" ).MongoClient;
var fs = require( "fs" );

var url01 = "mongodb://127.0.0.1:27017/test";
var url02 = "mongodb://192.168.2.19:27017/test";

var insertData = function(){
		MongoClient.connect( url01, function( err, db ){
		var collection = db.collection( "test_insert" );
		console.log( "Connection made" );
		var markdown = fs.readFileSync( "sample.md", "utf8" );
		var data = {
			"title": "sample.md",
			"markdown": markdown
		};
		
		collection.insert( data, function( err, docs ){
			collection.find().toArray( function( err, results ){
				console.dir( results );
				db.close();
			} );
		} );
	} );
};
exports.insertData = insertData;
