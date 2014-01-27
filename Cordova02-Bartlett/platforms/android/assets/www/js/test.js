describe( "floofy nougat", function(){
	it( "expects 32 to be 32", function(){
		expect( converter.fToCelsiusConverter() ).toBe( 32 );
	});
	it( "expects 145 to be 145", function(){
		expect( converter.milesToKM() ).toBe( 144 );
	});
	//alert( converter.milesToKM() );
});
