var express = require( "express" );
var app = express();
var MongoClient = require( "mongodb" ).MongoClient;
var fs = require( "fs" );
var exec = require( "child_process" ).exec;

var url01 = "mongodb://127.0.0.1:27017/test";
var url02 = "mongodb://192.168.2.19:27017/test";

var insertData = function(){
		MongoClient.connect( url01, function( err, db ){
		var collection = db.collection( "test_insert" );
		console.log( "Connection made" );
                collection.count( function( err, count ){
                    if( !err && count === 0 ){
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
					}
				} );
		} );
};

var generateHTML = function(){
	MongoClient.connect( url01, function( err, db ){
		var collection = db.collection( "test_insert" );
		collection.find().toArray( function( err, results ){
			console.log( results[ 0 ].markdown );
			fs.writeFileSync( "output.md", results[ 0 ].markdown, "utf8", function( err, data ){
				if( err ) throw err;
				console.log( "wrote output.md" );
			} );
			console.log( "MARKDOWN FOUND" );
			db.close();
		} );
	} );
	exec( "pandoc -t html5 -o output.html output.md", function( request, response ){
			console.log( "Success! File output.html was generated" );
	} );
};

exports.insertData = insertData;
exports.generateHTML = generateHTML;
