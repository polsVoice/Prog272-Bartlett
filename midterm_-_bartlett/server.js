var express = require( "express" );
var app = express();
var MongoClient = require( "mongodb" ).MongoClient;
var fs = require( "fs" );

app.use( express.bodyParser() );
var port = process.env.PORT || 30025;

var url01 = "mongodb://127.0.0.1:27017/test";
var url02 = "mongodb://192.168.2.19:27017/test";

app.post( "/insertData", function( request )
{
	MongoClient.connect( url01, function( err, db )
	{
		if( err ) throw err;
		else
		{
			var collection = db.collection( "test_insert" );
			var switcher = request.body.switcher;
			var file = "";
			if( switcher === "insertFile" )
			{
				file = "Shakespeare.json";
			}
			else if( switcher === "addPoem" )
			{
				file = "another_poem.json";
			}
			var input = fs.readFileSync( file, "utf8" );
			var jsonObject = JSON.parse( input );
			
			collection.insert( jsonObject, function( err, docs )
			{
				collection.find().toArray( function( err, results )
				{
					console.dir( results );
					db.close();
				} );
			} );
		}
	} );
} );

app.post( "/titleArray", function( request, response )
{
	MongoClient.connect( url01, function( err, db )
	{
		if( err ) throw err;
		var collection = db.collection( "test_insert" );
		console.dir( request.body.keyword );
		var keyword = request.body.keyword;
		collection.find(  { "keywords": keyword }, { "title": 1, "_id": 0 } ).toArray( function( err, results)
		{
			if( err ) console.dir( err );
			var titleArray = [];
			console.dir( results.length );
			for( var i = 0, ii = results.length; i < ii; i++ )
			{
				titleArray[ i ] = results[ i ].title;
			}
			response.send( { "result": titleArray } );
		} );
	} );
} );

app.post( "/getPoem", function( request, response )
{
	MongoClient.connect( url01, function( err, db )
	{
		if( err ) console.dir( err );
		else 
		{
			var collection = db.collection( "test_insert" );
			var title = request.body.title;
			collection.find( { "title": title }, { "content": 1, "_id": 0 } )
				.toArray( function( err, result )
				{
					if( err )
					{
						console.dir( err );
					}
					console.dir( result );
					response.send( { "result": result } );
				} );
		}
	} );
} );

app.post( "/deletePoem", function( request, response )
{
	MongoClient.connect( url01, function( err, db )
	{
		if( err ) console.dir( err );
		var collection = db.collection( "test_insert" );
		var title = request.body.title;
		var statusDone = true;
		collection.remove( { "title": title }, function()
		{
			response.send( { "result": statusDone } );
			console.dir( "Poem " + title + " was removed." ); 
		} );
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
