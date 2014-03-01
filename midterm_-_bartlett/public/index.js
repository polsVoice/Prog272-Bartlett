var midTerm = {
	init: function()
	{
		$( "#insertFile" ).on( "click", midTerm.inputFile );
		$( "#search" ).on( "click", midTerm.search );
		$( "#addPoem" ).on( "click", midTerm.inputFile );
		$( "#deleteButton" ).on( "click", midTerm.deletePoem );
		midTerm.createMenu( "poem" );
	},
	inputFile: function()
	{
		var switcher = this.id;
		console.log( switcher );
		
		$.ajax( {
			url: "/insertData",
			type: "POST",
			data: {
				"switcher": switcher
			},
			datatype: "json",
			success: function( data )
			{
				console.log( data );
			},
			error: function( jqxhr, status, errorThrown )
			{
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
		midTerm.createMenu( "poem" );
	},
	createMenu: function( keyword )
	{
		// remove previous menu
		$( "select" ).remove();
		
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
				$( "form" ).eq( 0 ).append( menu );
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
			success: function( data )
			{
				$( "#output" ).html( "<pre>" + data.result[ 0 ].content + "</pre>" );
			},
			error: function( jqxhr, status, errorThrown )
			{
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
	},
	search: function()
	{ 
		var keyword = $( "#searchField" ).val().toLowerCase();
		console.log( keyword );
		midTerm.createMenu( keyword );
	},
	deletePoem: function()
	{
		var title = $( "#deleteBox" ).val();
		$.ajax( {
			url: "/deletePoem",
			type: "POST",
			data: {
				"title": title
			},
			datatype: "json",
			success: function( data )
			{
				if( data.result )
				{
					console.log( "Poem '" + title + "' was deleted from the database." );
					midTerm.createMenu( "poem" );
				}
			},
			error: function( jqxhr, status, errorThrown )
			{
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
	}
};
midTerm.init();
