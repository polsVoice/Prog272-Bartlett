/**
 * @author bbartlett
 */

console.log( "It works" );

var milesConvert = {
	miles: 3,
	feetPerMile: 5280,
	milesToFeet: function(){
        "use strict";		
		return this.miles * this.feetPerMile;
	}
};

console.log( milesConvert.miles + " is " + milesConvert.milesToFeet() + " feet." );
