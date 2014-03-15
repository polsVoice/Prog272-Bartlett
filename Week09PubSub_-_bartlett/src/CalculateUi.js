
define( [ "jQuery", "pubsub" ], function()
{
    function publisher()
    {
        $( "#num1" ).val( 3 );
        $( "#num2" ).val( 2 );
        $( "#addButton" ).on( "click", addition );
        $( "#multiplyButton" ).on( "click", multiply );
        $( "#subtractButton" ).on( "click", subtract );
    }
    
    var addition = function()
    {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.publish( "addition", { num1: num1, num2: num2, 
                                    callback: function( result )
                                    { 
                                        $( "#result" ).html( result ); 
                                    } 
                                } );
    };
    
    var multiply = function()
    {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.publish( "multiplication", { num1: num1, num2: num2, 
                                    callback: function( result )
                                    { 
                                        $( "#result" ).html( result ); 
                                    } 
                                } );
    };
    
    var subtract = function()
    {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.publish( "subtraction", { num1: num1, num2: num2, 
                                    callback: function( result )
                                    { 
                                        $( "#result" ).html( result ); 
                                    } 
                                } );
    };

    
    return{
        publisher: publisher
    };
} );
