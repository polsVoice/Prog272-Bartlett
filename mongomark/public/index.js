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
		$( "#message" ).html( "HTML file has been generated." );
	},
	printHTML: function(){
		$.get( "/read", function( data ){
			console.log( "inside printHTML" );
			$( "#output" ).html( data.result );
			$( "#message" ).html( "Please make a selection below." );
			} );
	},
	showSection: function(){
		if( $( this ).is( ":checked" ) )
		{
			$( "#output *" ).css( "display", "none" );
			var theId = "#" + $( this ).val();
			console.log( theId );
			$( "#output > " + theId + ", " + theId + " + p" ).css( "display", "block" );
		}
	}
};
mongoMark.init();
