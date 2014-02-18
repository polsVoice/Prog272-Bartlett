var feetInMile = function(){
	return "There are 5280 feet in a mile.";
};

var calcFeetInMiles = function( miles ){
	return miles * 5280;	
};

exports.feetInMile = feetInMile;
exports.calcFeetInMiles = calcFeetInMiles;
