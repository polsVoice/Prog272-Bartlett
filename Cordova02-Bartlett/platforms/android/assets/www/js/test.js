var testNum = 16;
describe( "floofy nougat", function(){
	it( "expects 16 degrees Fahrenheit to be -8.88 degrees Celsius", function(){
		expect( converter.fToCelsius( testNum ) ).toBeCloseTo( -8.88, 1 );
	});
	it( "expects 16 miles to be 25.6 km", function(){
		expect( converter.milesToKM( testNum ) ).toBe( 25.6 );
	});
	it( "expects sqrt of 16 to be 4", function(){
		expect( converter.squareRoot( testNum ) ).toBe( 4 );
	});
});
