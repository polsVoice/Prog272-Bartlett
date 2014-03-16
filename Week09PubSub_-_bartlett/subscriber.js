
var pubSub = {
        publisher: null,
        subscriber: null,
        init: function()
        {
            this.publisher = new pubSub.publisher();
            this.subscriber = new pubSub.subscriber();
        }
    };

pubSub.subscriber = ( function()
{
    function subscriber()
    {
        $.topic( "addition" ).subscribe( add );
        $.topic( "multiplication" ).subscribe( multiply );
        $.topic( "subtraction" ).subscribe( subtract );
    }
    
    function add( numbers )
    {
        numbers.callback( parseInt( numbers.num1 ) + parseInt( numbers.num2 ) );
    }
    
    function multiply( numbers )
    {
        numbers.callback( numbers.num1 * numbers.num2 );
    }
    
    function subtract( numbers )
    {
        numbers.callback( numbers.num1 - numbers.num2 );
    }
    
    return subscriber;
    
}() );
