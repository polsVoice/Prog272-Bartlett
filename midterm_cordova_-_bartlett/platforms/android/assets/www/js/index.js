var poemReader = {
	ip: "http://192.168.1.108:30025",
	init: function()
	{
		"use strict";
		$( "#insertFile" ).on( "click", poemReader.inputFile );
		$( "#search" ).on( "click", poemReader.search );
		$( "#addPoem" ).on( "click", poemReader.inputFile );
		$( "#deleteButton" ).on( "click", poemReader.deletePoem );
		poemReader.createMenu( "poem" );
	},
	inputFile: function()
	{
		"use strict";
		var switcher = this.id;
		console.log( switcher );
		
		$.ajax( {
			url: poemReader.ip + "/insertData",
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
		poemReader.createMenu( "poem" );
	},
	createMenu: function( keyword )
	{
		"use strict";
		// remove previous menu
		$( "select" ).remove();
		
		$.ajax( {
			url: poemReader.ip + "/titleArray",
			type: "POST",
			data: {
				"keyword": keyword
			},
			datatype: "json",
			success: function( data )
			{
				console.log( "calling /titleArray" );
				var titleArray = data.result;
				if( titleArray.length > 0 )
				{
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
						poemReader.displayPoem( $( this ).val() );
					} );
					$( "form" ).eq( 0 ).append( menu );
				}
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
		"use strict";
		console.log( title );
		$.ajax( {
			url: poemReader.ip + "/getPoem",
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
		"use strict";
		var keyword = $( "#searchField" ).val().toLowerCase();
		console.log( keyword );
		poemReader.createMenu( keyword );
	},
	deletePoem: function()
	{
		"use strict";
		var title = $( "#deleteBox" ).val();
		$.ajax( {
			url: poemReader.ip + "/deletePoem",
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
					poemReader.createMenu( "poem" );
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
poemReader.init();
