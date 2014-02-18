var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var ftInMilesMod = require( "./library/feet_in_mile.js" );
var circumCircle = require( "./library/circle_circumference.js" );

app.use( express.bodyParser() );
var port = process.env.PORT || 30025;

app.get( "/printFtInMiles", function( request, response ){
	console.log( "printFtInMiles called" );
	response.send( ftInMilesMod.feetInMile() );
} );

app.get( "/calcFtInMile", function( request, response ){
	var miles = parseInt( request.query.miles );
	var result = ftInMilesMod.calcFeetInMiles( miles );
	response.send( { "result": result } );
} );

/*
// With a get, the parameters are passed in request.query
app.get('/add', function(request, response) {
	console.log('add called');	
	console.log(request.query);	
	var result = parseInt(request.query.operandA) + parseInt(request.query.operandB);
	response.send({ "result": result });
});

/* To handle a post, we have to add express.bodyParser, shown above
   Now our parameters come in on request.body */
   
/* 
app.post('/add', function(request, response) {
	console.log('add called');	
	console.log(request.body);	
	var result = parseInt(request.body.operandA) + parseInt(request.body.operandB);
	response.send({ "result": result });
});
*/

app.get( "/", function( request, response ){
	var html = fs.readFileSync( __dirname + "/public/index.html" );
	response.writeHeader( 200, { "Content-Type": "text/html" } );
	response.write( html );
	response.end();
} );

app.use( "/", express.static( __dirname + "/public" ) );
app.listen( port );
console.log( "Listening on port: " + port );

