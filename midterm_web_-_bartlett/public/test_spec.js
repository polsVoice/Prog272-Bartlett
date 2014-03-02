var request = require( "request" );	

describe( "Test routes", function()
{
	"use strict";
	it( "should fetch a poem", function( done )
	{
		request( "http://localhost:30025/getPoem", function( err, response, body )
		{
			expect( body ).not.toEqual( "" )
		} );
	} );
} );
