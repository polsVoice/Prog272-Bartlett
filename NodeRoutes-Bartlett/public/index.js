var calculator = {
	init: function(){
		$( "#feetInMileButton" ).on( "click", calculator.printFeetInMile );
	},
	printFeetInMile: function(){
		var feetInMile = $( "#feetInMile" );
		feetInMile.load( "/printFtInMiles", function( response, status, xhr ){
			if( status == "error" ){
				feetInMile.html( "Error: <strong>" + xhr.statusText + "</strong>" );
			}
		} );
	}
};
calculator.init();
