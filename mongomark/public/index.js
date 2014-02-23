var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "input:radio" ).on( "click", mongoMark.showSection );
	},
	readMarkdown: function(){
		
		// insert Markdown file into database
		$.getJSON( "/insert", function( data ){
			console.log( "In getJSON()" );
			console.dir( data );
		} );
		$( "#message" ).html( "Read in markdown file." )

		// generate HTML file from database
		console.log( "generateHTML button clicked" );
		$.get( "/generate" );
		$( "#message" ).append( "<br />HTML file has been generated." );
		
		// read HTML file back from server
		$.get( "/read", function( data ){
			console.log( "inside printHTML" );
			$( "#output" ).html( data.result );
			$( "#message" ).append( "<br />Please make a selection below." );
			} );
	},
	showSection: function(){
		if( $( this ).is( ":checked" ) )
		{
			// reset all of the div elements
			$( "#output *" ).css( "display", "none" );
			// get the value of the button, which matches the ids of the h1s
			// and format for CSS
			var theId = "#" + $( this ).val();
			console.log( theId );
			// select the h1 and the p following it
			$( theId + ", " + theId + " + p" ).css( "display", "block" );
		}
	}
};
mongoMark.init();
