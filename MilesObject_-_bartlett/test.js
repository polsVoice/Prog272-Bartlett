milesConvert.miles = 2;

describe("Miles Conversion Test", function()
{
    it( "expects 2 miles to be 10,560 feet", function()
    {
        expect(milesConvert.milesToFeet()).toBe(10560);
    });
});
