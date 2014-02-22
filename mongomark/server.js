var createJSON = require( "./create_json.js" );
var express = require( "express" );
var app = express();
var fs = require( "fs" );

app.get( "/insert", function(){
	createJSON.insertData();
} );

app.get( "/generate", function(){
	console.log( "in /generate" );
	createJSON.generateHTML();
} );

app.get( "/read", function( request, response ){
	//~ var query = new createJSON.QueryMongo();
	//~ var data = query.getData( response );
	
} );

app.get( "/", function( request, result ){
	var html = fs.readFileSync( __dirname + "/public/index.html" );
	result.writeHeader( 200, { "Content-Type": "text/html" } );
	result.write( html );
	result.end();
} );

app.use( "/", express.static( __dirname + "/public/" ) );

app.listen( 30025 );
console.log( "Listening on port 30025" );
