var express = require( "express" );
var app = express();
var MongoClient = require( "mongodb" ).MongoClient;
var fs = require( "fs" );

var port = process.env.PORT || 30025;

var url01 = "mongodb://127.0.0.1:27017/test";
var url02 = "mongodb://192.168.2.19:27017/test";

var insertData = function(){
	MongoClient.connect( url01, function( err, db ){
		if( err ) throw err;
		else
		{
			var collection = db.collection( "test_insert" );
			console.log( "collection to database established" );
			var inputFile = fs.readFileSync( "Shakespeare.json", "utf8" );
			var jsonObject = JSON.parse( inputFile );
			
			collection.insert( jsonObject, function( err, docs ){
				collection.find().toArray( function( err, results ){
					console.dir( results );
					//db.close();
				} );
			} );
		}
	} );
};


insertData();

app.get( "/titleArray", function( request, response ){
	MongoClient.connect( url01, function( err, db ){
		if( err ) throw err;
		else{
			var collection = db.collection( "test_insert" );
			collection.find().toArray( function( err, results){
				if( err ) console.dir( err );
				var titleArray = [];
				for( var i = 0, ii = results.length; i < ii; i++ )
				{
					titleArray[ i ] = results[ i ].title;
				}
				response.send( { "result": titleArray } );
			} );
		}
	} );
} );

app.get( "/", function( request, result ){
	var html = fs.readFileSync( __dirname + "/public/index.html" );
	result.writeHeader( 200, { "Content-Type": "text/html" } );
	result.write( html );
	result.end();
} );

app.use( "/", express.static( __dirname + "/public/" ) );

app.listen( port );
console.log( "Listening on port: " + port );
