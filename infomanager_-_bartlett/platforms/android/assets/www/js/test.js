describe( "Test loading file", function() {
	it( "is true", function(){ 
		textLoader.loadFile( "Sources.html #paragraph01" );
		expect().toBeTruthy();
	} );
});
