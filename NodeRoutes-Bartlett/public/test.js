var testNum = 3;
var testNum2 = 6;

describe( "Module Test", function(){
	it( "expects to get feet in mile statement", function(){
		expect( feetInMile() ).toBe( "There are 5280 feet in a mile." );
	} );
	it( "expects 3 miles to be 15840 feet", function(){
		expect( calcFeetInMiles( testNum ) ).toBe( 15840 );
	} );
	it( "expects the circumference of circle with radius 6 to be close to 37.7", function(){
		expect( circumCircle( testNum2 ) ).toBeCloseTo( 37.7 );
	} );
} );
