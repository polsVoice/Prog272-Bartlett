var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "input:radio" ).on( "click", mongoMark.showSection );
	},
	readMarkdown: function(){
		$.getJSON( "/insert", function( data ){
			console.log( "In getJSON()" );
			console.dir( data );
		} );
		$( "#message" ).html( "Read in markdown file." )
	//},
	//generateHTML: function(){
		console.log( "generateHTML button clicked" );
		$.get( "/generate" );
		$( "#message" ).append( "<br />HTML file has been generated." );
	//},
	//printHTML: function(){
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
			// select the 
			$( theId + ", " + theId + " + p" ).css( "display", "block" );
		}
	}
};
mongoMark.init();
