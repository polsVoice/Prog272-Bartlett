/**
 * @author bbartlett
 */

/* jshint strict true */

console.log( "It works" );

var milesConvert = {
	miles: 3,
	feetPerMile: 5280,
	milesToFeet: function()
	{
		
		return this.miles * this.feetPerMile;
	}
};
