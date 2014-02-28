var midTerm = {
	init: function(){
		$( "#inputFile" ).on( "click", midTerm.inputFile );
		$( "#search" ).on( "click", midTerm.search );
		midTerm.createMenu( "poem" );
	},
	inputFile: function(){
		$.getJSON( "/insertData", function( data ){
			console.dir( data );
		} );
	},
	createMenu: function( keyword )
	{
		$.ajax( {
			url: "/titleArray",
			type: "POST",
			data: {
				"keyword": keyword
			},
			datatype: "json",
			success: function( data )
			{
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
				$( menu ).change( function()
				{
					midTerm.displayPoem( $( this ).val() );
				} );
				$( "p" ).before( menu );
			},
			error: function( jqxhr, status, errorThrown )
			{
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
	},
	displayPoem: function( title )
	{
		console.log( title );
		$.ajax( {
			url: "/getPoem",
			type: "POST",
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
	},
	search: function()
	{
		$( "select" ).remove();
		var keyword = $( "#searchField" ).val().toLowerCase();
		console.log( keyword );
		midTerm.createMenu( keyword );
	}
};
midTerm.init();
