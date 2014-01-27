describe( "floofy nougat", function(){
	it( "expects 32.222 to be close to 32", function(){
		expect( fahrenheitToCelsius() ).toBeCloseTo( 32 );
	});
});
