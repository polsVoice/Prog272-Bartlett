describe("Elvenware Jasmine One Suite", function() {
  it("expects 9 to be 9", function() {
    expect(numGetter.getNine()).toBe(9);
  });

  it( "expects 8 to be 8", function(){
	  expect( numGetter.getEight() ).toBe( 8 );
  });
});
//
