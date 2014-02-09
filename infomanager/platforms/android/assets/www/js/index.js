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
				$( "#div01" ).load( "Sources.html #paragraph02", function() {
					console.log( "Load was performed." );
				});
				break;
			case "buttonHtml02":
				$( "#div01" ).load( "Sources.html #paragraph02", function() {
					console.log( "Load was performed." );
				});
				break;
			case "buttonHtml03":
				$( "#div01" ).load( "Sources.html #paragraph03", function() {
					console.log( "Load was performed." );
				});
				break;
			default:
				break;
		}
	},
	loadFile: function( file )
	{
		var loaded;
		$( "#div01" ).load( file, function( response, status, xhr ){
			if( status === "error" ){
				loaded = false;
			}
			else
			{
				loaded = true;
			}
		} );
		console.log( loaded );
		return loaded;
	}
};
textLoader.init();
