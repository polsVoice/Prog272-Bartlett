var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "#genHTML" ).on( "click", mongoMark.generateHTML );
		$( "#printHTML" ).on( "click", mongoMark.printHTML );
	},
	readMarkdown: function(){
		//console.log( "readMarkdown button clicked" );
		$.getJSON( "/insert", function( data ){
			console.log( "In getJSON()" );
			console.dir( data );
		} );
	},
	generateHTML: function(){
		console.log( "generateHTML button clicked" );
		$.get( "/generate" );
	},
	printHTML: function(){
		$.get( "/read", function( data ){
			console.log( "inside printHTML" );
			$( "#output" ).html( data.result );
			} );
		}
};
mongoMark.init();
