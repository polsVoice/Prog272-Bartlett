
define( [ "jQuery", "pubsub" ], function()
{
    "use strict";
    
    function subscriber()
    {
        console.log( "Subscriber constructor called." );
        $.subscribe( "addition", add );
        $.subscribe( "multiplication", multiply );
        $.subscribe( "subtraction", subtract );
    }
    
    function add( event, numbers )
    {
        console.log( "Add function called." );
        console.log( event );
        numbers.callback( parseInt( numbers.num1 ) + parseInt( numbers.num2 ) );
    }
    
    function multiply( event, numbers )
    {
        console.log( "Multiply function called." );
        console.log( event );
        numbers.callback( numbers.num1 * numbers.num2 );
    }
    
    function subtract( event, numbers )
    {
        console.log( "Subtract function called." );
        console.log( event );
        numbers.callback( numbers.num1 - numbers.num2 );
    }
    
    return{
        subscriber: subscriber
    };
} );
