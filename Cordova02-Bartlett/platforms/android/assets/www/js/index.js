var converter = {
		num: 0,
		init: function(){
			$( "button" ).click( converter.clickHandler );
		},
		clickHandler: function(){
			//send button identifier
			converter.resultSetter( this.id );
		},
		resultSetter: function( switcher ){
			var num = $( "#inputBox" ).get( 0 ).value;
			var result = 0;
			
			if( isNaN( num ) || num.length === 0 )
			{
				$( "#answer" ).html( "Invalid input! Try again" );
				converter.reset();
			}
			else
			{
			// determine result based upon which button was pressed
				switch( switcher )
				{
					case "fToCelsius":
						result = converter.resultRound( converter.fToCelsius( num ) );
						$( "#answer" ).html( num + " &deg; Fahrenheit = " + result + " &deg; Celsius" );
						converter.reset();
						break;
					case "milesToKM":
						result = converter.resultRound( converter.milesToKM( num ) );
						$( "#answer" ).html( num + " miles = " + result + " km" );
						converter.reset();
						break;
					case "squareRoot":
						result = converter.resultRound( converter.squareRoot( num ) );
						$( "#answer" ).html( "The square root of " + num + " is " + result );
						converter.reset();
						break;
					default:
						$( "#answer" ).html( "Invalid input! Try again" );
						converter.reset();
				}
			}
		},
		reset: function(){
			var inputBox = $( "#inputBox" ).get( 0 );
			inputBox.value = "";
			inputBox.focus();
		},
		resultRound: function( result ){
			// rounds to 2 decimal places
			return Math.round( ( result + 0.00001 ) * 100 ) / 100;
		},
		fToCelsius: function( inputNum ){
			var celsius;
			celsius = ( inputNum - 32 ) * ( 5 / 9 );
			return celsius;
		},
		milesToKM: function( inputNum ){
			var kilometers;
			kilometers = inputNum * 1.6;
			return kilometers;
		},
		squareRoot: function( inputNum ){
			return Math.sqrt( inputNum );
		}
	};
converter.init();
