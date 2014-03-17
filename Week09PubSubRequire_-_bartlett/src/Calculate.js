
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
        numbers.answer( parseInt( numbers.num1 ) + parseInt( numbers.num2 ) );
    }
    
    function multiply( event, numbers )
    {
        numbers.answer( numbers.num1 * numbers.num2 );
    }
    
    function subtract( event, numbers )
    {
        numbers.answer( numbers.num1 - numbers.num2 );
    }
    
    return{
        subscriber: subscriber
    };
} );
