var mongoMark = {
	init: function(){
		$( "#inputData" ).on( "click", mongoMark.readMarkdown );
		$( "#outputData" ).on( "click", mongoMark.generateHTML );
	},
	readMarkdown: function(){
		
		// insert Markdown file into database
		$.getJSON( "/insert", function( data ){
			console.log( "In getJSON()" );
			console.dir( data );
		} );
		$( "#message" ).html( "Read in markdown file." );
	},
	generateHTML: function(){
		// generate HTML file from database
		console.log( "generateHTML button clicked" );
		$.get( "/generate" );
		$( "#message" ).append( "<br />HTML file has been generated." );
		
		// read HTML file back from server
		$.get( "/read", function( data ){
			$( "#output" ).html( data.result );
			mongoMark.createList();
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
			// select the h1 and the p following it
			$( theId + ", " + theId + " + p" ).css( "display", "block" );
		}
	},
	createList: function(){
		var headers = $( "h1" );
		var theForm = document.createElement( "form" );
		for( var i = 0, ii = headers.length; i < ii; i++ )
		{
			var theValue = $( headers[ i ] ).attr( "id" );
			
			// capitalize value
			var valCapitalized = theValue.charAt( 0 ).toUpperCase() + theValue.substring( 1 );
			
			// create radio button
			var theInput = $( "<input type='radio' name='animal' value='" + theValue + "' />" + valCapitalized + "<br />" );
			$( theForm ).append( theInput );
		}
		// insert form after hr
		$( "hr" ).after( theForm );
		$( "input:radio" ).on( "click", mongoMark.showSection );
	}
};
mongoMark.init();
