var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "#genHTML" ).on( "click", mongoMark.generateHTML );
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
	}
};
mongoMark.init();
