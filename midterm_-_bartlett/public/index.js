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
			$( "p" ).after( menu );
		} );
	},
	displayPoem: function( title ){
		console.log( title );
		$.getJSON( "/getPoem", function( data ){
			console.log( data.result );
			//var poem = JSON.stringify( data.result );
			//console.log( poem.content );
		} );
	}
		/*$.ajax( {
			url: "/getPoem",
			type: "GET",
			data: {
				"title": title
			},
			datatype: "json",
			success: function( data ){
				//var thePoem = $.parseJSON( data.result );
				var poem = data.result;
				console.log( poem.content );
				//console.log( thePoem.content );
				//$( "#output" ).html( thePoem.content );
			},
			error: function( jqxhr, status, errorThrown ){
				console.log( jqxhr.responseText );
				console.log( status );
				console.log( errorThrown );
			}
		} );
		*/
};
midTerm.init();
