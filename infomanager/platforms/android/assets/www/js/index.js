var textLoader = {
	init: function(){
		$( "button" ).on( "click", textLoader.clickHandler );
	},
	clickHandler: function(){
		textLoader.switcher( this.id );
	},
	switcher: function( buttonId ){
		switch( buttonId )
		{
			case "buttonHtml01":
				textLoader.loadFile( "Sources.html #paragraph01" );
				break;
			case "buttonHtml02":
				textLoader.loadFile( "Sources.html #paragraph02" );
				break;
			case "buttonHtml03":
				textLoader.loadFile( "Sources.html #paragraph03" );
				break;
			default:
				$( "#div01" ).html( "<p>Source not found.</p>" );
				break;
		}
	},
	loadFile: function( file )
	{
		var loaded = false;
		$( "#div01" ).load( file, { param: true }, function( data ) {
			loaded = true;
			console.log( loaded );
		} );
	}
};
textLoader.init();
