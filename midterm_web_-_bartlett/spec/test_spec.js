var request = require( "request" );	

describe( "Test routes", function()
{
	"use strict";
	it( "should insert poetry file", function( done )
	{
		var switcher = "insertFile";
		request.post( { switcher: switcher }, "http://localhost:30025/insertData", function( err, response, body )
		{
			expect( body ).toContain( "Sonnet" );
			done();
		} );
	} );
} );
