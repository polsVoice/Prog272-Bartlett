var midTerm = {
	init: function(){
		$( "#inputFile" ).on( "click", midTerm.inputFile );
		midTerm.createMenu();
	},
	inputFile: function(){
		$.getJSON( "/insertData", function( data ){
			console.dir( data );
		} );
	},
	createMenu: function(){
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
			$( "p" ).before( menu );
		} );
	},
	displayPoem: function( title )
	{
		console.log( title );
		$.ajax( {
			url: "/getPoem",
			type: "GET",
			data: {
				"title": title
			},
			datatype: "json",
			success: function( data ){
				$( "#output" ).html( "<pre>" + data.result[ 0 ].content + "</pre>" );
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
