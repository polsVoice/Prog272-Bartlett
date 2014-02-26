describe("Elvenware Jasmine One Suite", function() {
  it("expects 9 to be 9", function() {
    expect(numberGetter.getNine()).toBe(9);
  });

  it( "expects 8 to be 8", function(){
	  expect( numberGetter.getEight() ).toBe( 8 );
  });
});
//
