var midTerm = {
	init: function(){
		$( "#inputFile" ).on( "click", midTerm.inputFile );
		$.getJSON( "/titleArray", function( data ){
			console.log( "calling /titleArray" );
			var titleArray = data.result;
			titleArray = titleArray.sort();
			var menu = document.createElement( "select" );
			var menuHeader = $( "<option value='select'>Select Poem</option>" );
			$( menu ).append( menuHeader );
			for( var i = 0, ii = titleArray.length; i < ii; i++ )
			{
				var item = $( "<option value='" + titleArray[ i ] + "'>" + titleArray[ i ] + "</option>" );
				$( menu ).append( item );
			}
				$( menu ).change( function(){
					//console.log( $( this ).val() );
					midTerm.displayPoem( $( this ).val() );
				} );
				$( "p" ).after( menu );
		} );
	},
	inputFile: function(){
		$.getJSON( "/insertData", function( data ){
			console.dir( data );
		} );
	},
	displayPoem: function( title ){
		/*$.getJSON( "/getPoem", function( data ){
			$( "#output" ).html( data.result );
		} );
		*/
		console.log( title );
		/*$.getJSON( "/getPoem", function( data ){
			var content = data.result;
			console.log( content );
		} );
		*/
		$.ajax( {
			url: "/getPoem",
			type: "GET",
			data: {
				"title": title
			},
			datatype: "json",
			success: function( data ){
				var thePoem = $.parseJSON( data.result );
				$( "#output" ).html( thePoem.content );
				console.log( data.result );
			},
			error: function( jqxhr, status, errorThrown ){
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
	}
};
midTerm.init();
