var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "#genHTML" ).on( "click", mongoMark.generateHTML );
	},
	readMarkdown: function(){
		console.log( "readMarkdown button clicked" );
		$.getJSON( "/insert", function( data ){
			console.log( "In getJSON()" );
			console.dir( data );
		} );
		
	}
};
mongoMark.init();
