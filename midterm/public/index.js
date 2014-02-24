var midTerm = {
	init: function(){
		$( "#inputFile" ).on( "click", midTerm.inputFile );
		$.getJSON( "/titleArray", function( data ){
			var titleArray = data.result;
			titleArray = titleArray.sort();
			var menu = document.createElement( "select" );
			for( var i = 0, ii = titleArray.length; i < ii; i++ )
			{
				var item = $( "<option value='" + titleArray[ i ] + "'>" + titleArray[ i ] + "</option>" );
				$( menu ).append( item );
			}
				$( "p" ).after( menu );
		} );
	},
	inputFile: function(){
	}
};
midTerm.init();
