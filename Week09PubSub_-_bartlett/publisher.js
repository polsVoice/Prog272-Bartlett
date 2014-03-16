
pubSub.publisher = ( function()
{
    "use strict";
    
    function publisher()
    {
        $( "#num1" ).val( 3 );
        $( "#num2" ).val( 2 );
        
        $( "#addButton" ).on( "click", addition );
        $( "#multiplyButton" ).on( "click", multiplication );
        $( "#subtractButton" ).on( "click", subtraction );
    }
   
   function addition()
   {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.topic( "addition" ).publish( 
            { 
                num1: num1, 
                num2: num2, 
                callback: function( result )
                { 
                    $( "#result" ).html( result ); 
                } 
            } );
   }
   function multiplication()
   {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.topic( "multiplication" ).publish( 
            { 
                num1: num1, 
                num2: num2, 
                callback: function( result )
                { 
                    $( "#result" ).html( result ); 
                } 
            } );
   }
   function subtraction()
   {
        var num1 = $( "#num1" ).val();
        var num2 = $( "#num2" ).val();
        $.topic( "subtraction" ).publish( 
            { 
                num1: num1, 
                num2: num2, 
                callback: function( result )
                { 
                    $( "#result" ).html( result ); 
                } 
            } );
   }
   
    return publisher;
}() );

$( document ).ready(function()
{
    pubSub.init();
});
