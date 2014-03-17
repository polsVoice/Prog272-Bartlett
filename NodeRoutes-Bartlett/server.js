var express = require( 'express' );
var app = express();
var fs = require( "fs" );
var ftInMilesMod = require( "./library/feet_in_mile.js" );
var circumCircle = require( "./library/circle_circumference.js" );

var connect = require( "connect" );
app.use( connect.urlencoded() );
app.use( connect.json() );

var port = process.env.PORT || 30025;

app.get( "/printFtInMiles", function( request, response ){
	response.send( ftInMilesMod.feetInMile() );
} );

app.get( "/calcFtInMile", function( request, response ){
	var miles = parseInt( request.query.miles );
	var result = ftInMilesMod.calcFeetInMiles( miles );
	response.send( { "result": result } );
} );

app.post( "/calcCirc", function( request, response ){
	var radius = parseInt( request.body.radius );
	var result = circumCircle.circumCircle( radius );
	response.send( { "result": result } );
} );

app.get( "/", function( request, response ){
	var html = fs.readFileSync( __dirname + "/public/index.html" );
	response.writeHeader( 200, { "Content-Type": "text/html" } );
	response.write( html );
	response.end();
} );

app.use( "/", express.static( __dirname + "/public" ) );
app.listen( port );
console.log( "Listening on port: " + port );

