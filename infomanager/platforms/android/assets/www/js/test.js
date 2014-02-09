describe( "Test loading file", function() {
	it( "is true", function(){ 
		expect( textLoader.loadFile( "Sources.html #paragraph01" ) ).toBeTruthy();
	} );
});
