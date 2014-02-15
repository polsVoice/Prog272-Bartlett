var express = require( 'express' );
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require( 'fs' );

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

MongoClient.connect( url01, function( err, db ){
	var collection = db.collection( "test_insert" );
	collection.count( function( err, count ){
		if( !err && count === 0 ){
			var theArray = [];
			console.log( collection.count );
			for( var i = 10000; i < 10250; i++ )
			{
				var obj = {
					"firstName": "Bob" + i,
					"lastName": "Dobbs" + i,
					"address": i + " Fedora Lane",
					"city": "Bellevue",
					"state": "WA",
					"zip": "98002"
				};
				theArray.push( obj ); 
			}
			
			collection.insert( theArray, function( err, docs ){
					collection.count( function( err, count ){
						console.log( format( "count = %s", count ) );
					} );
					collection.find().toArray( function( err, results ){
						console.dir( results );
						db.close();
					} );
				} );
			}
		} );
} );

var QueryMongo = ( function(){
	
	function QueryMongo(){
	}
	
	QueryMongo.prototype.getData = function( result ){
		console.log( 'Called getData' );
		
		MongoClient.connect( url01, function( err, database ){
			if( err )
				throw err;
			console.log( 'IngetDataCallback' );
			getCollection( database, result );
		} );
	};
	
	var getCollection = function( database, response ){
		var collection = database.collection( 'test_insert' );
		collection.count( function( err, count ){
			console.log( format( "count = %s", count ) );
		} );
	
		collection.find().toArray( function( err, theArray ){
			console.dir( theArray );
			database.close();
			response.send( theArray );
		} );
	};
	
	return QueryMongo;
	
}() );

app.get( '/read', function( request, response ){
	var q = new QueryMongo();
	var data = q.getData( response );
} );

app.get( '/', function( request, result ){
	var html = fs.readFileSync( __dirname + '/public/index.html' );
	result.writeHeader( 200, { "Content-Type": "text/html" } );
	result.write( html );
	result.end();
} );

app.use( "/", express.static( __dirname + '/public' ) );

app.listen( 30025 );
console.log( 'Listening on port 30025' );
