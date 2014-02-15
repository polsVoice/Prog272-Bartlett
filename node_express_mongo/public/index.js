/*function showData(){
	$.getJSON( '/read', function( data ){
		console.log( data );
		for( var i = 0; i < data.length; i++ ){
			$( "#mongoData" ).append( '<li>' + JSON.stringify( data[ i ] ) + '</li>' );
		}
	} );
}

$( document ).ready( function(){
	showData();
} );
*/

var dataDisplay = {
	init: function(){
		$( "#showButton" ).on( "click", dataDisplay.showRecord );
		var field1 = $( "#line1" );
		var field2 = $( "#line2" );
		var field3 = $( "#line3" );
		$.getJSON( '/read', function( data ){
			theData = data[ 0 ];
			field1.html( theData[ "firstName" ] + " " + theData[ "lastName" ] );
			field2.html( theData[ "address" ] );
			field3.html( theData[ "city" ] + " " + theData[ "state" ] + " " + theData[ "zip" ] );
		} );
	},
	showRecord: function(){
		var value = $( "#userInput" ).val();
		var field1 = $( "#line1" );
		var field2 = $( "#line2" );
		var field3 = $( "#line3" );
		$.getJSON( '/read', function( data ){
			theData = data[ value ];
			field1.html( theData[ "firstName" ] + " " + theData[ "lastName" ] );
			field2.html( theData[ "address" ] );
			field3.html( theData[ "city" ] + " " + theData[ "state" ] + " " + theData[ "zip" ] );
		} );
	}
};
dataDisplay.init();
