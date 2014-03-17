
define( [ "jQuery", "pubsub" ], function()
{
    "use strict";
    
    function publisher()
    {
        $( "#num1" ).val( 3 );
        $( "#num2" ).val( 2 );
        $( "#addButton" ).on( "click", publishNums );
        $( "#multiplyButton" ).on( "click", publishNums );
        $( "#subtractButton" ).on( "click", publishNums );
    }
    
    var nums = function()
    {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        return{
            num1: num1,
            num2: num2,
            answer: function( result )
            {
                $( "#result" ).html( result );
            }
        };
    }
    
    var publishNums = function()
    {
        var buttonId = this.id;
        var pubName = "";
        
        switch( buttonId )
        {
            case "addButton":
                pubName = "addition";
                break;
            case "multiplyButton":
                pubName = "multiplication";
                break;
            case "subtractButton":
                pubName = "subtraction";
                break;
        }
        $.publish( pubName, nums() );
    };

    return{
        publisher: publisher
    };
} );
