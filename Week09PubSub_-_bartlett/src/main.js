require.config( {
    paths: {
        "jQuery": "http://code.jquery.com/jquery-latest.min",
        "pubsub": "TinyPubSub"
    }
} );

require( [ "CalculateUi", "Calculate", ], function( calcUi, calc )
{
    console.log( "Main called." );
    calcUi.publisher();
    calc.subscriber();
} );
