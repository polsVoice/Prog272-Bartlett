console.log( "hello!" );
require.config(
{
    paths: {
        "jquery": "http://code.jquery.com/jquery-latest.min",
        "pubsub": "../public/PubSubOn",
        "clientMongo": "../public/ClientMongo",
        "jasmine": "jasmine/jasmine",
        "jasmine-html": "jasmine/jasmine-html",
        "boot": "jasmine/boot"
    }
} );

require( [ "jquery", "boot" ], function( j, b, c )
{
    "use strict";
    require( [ "client_spec" ], function()
    {
        console.log( "main called." );
        window.onload();
    } );
} );
