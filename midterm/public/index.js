var midTerm = {
	init: function(){
		$( "#inputFile" ).on( "click", midTerm.inputFile );
		$.getJSON( "/titleArray", function( data ){
			console.log( "calling /titleArray" );
			var titleArray = data.result;
			titleArray = titleArray.sort();
			var menu = document.createElement( "select" );
			for( var i = 0, ii = titleArray.length; i < ii; i++ )
			{
				var item = $( "<option value='" + titleArray[ i ] + "'>" + titleArray[ i ] + "</option>" );
				$( menu ).append( item );
			}
				$( menu ).change( function(){
					console.log( $( this ).val() );
				} );
				$( "p" ).after( menu );
		} );
	},
	inputFile: function(){
		$.getJSON( "/insertData", function( data ){
			console.dir( data );
		} );
	},
	displayPoem: function(){
		$.getJSON( "/getPoem", function( data ){
			$( "#output" ).html( data.result );
		} );
	}
};
midTerm.init();
