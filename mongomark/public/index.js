var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "#genHTML" ).on( "click", mongoMark.generateHTML );
		$( "#printHTML" ).on( "click", mongoMark.printHTML );
		$( "input:radio" ).on( "click", mongoMark.showSection );
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
	},
	showSection: function(){
		if( $( this ).is( ":checked" ) )
		{
			$( "#output" ).css( "display", "block" );
		}
	}
};
mongoMark.init();
