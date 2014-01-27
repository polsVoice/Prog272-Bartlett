var converter = {
	fahrenheitTemp: 90,
	init: function(){
		$( "#fToCelsius" ).click( converter.fToCelsiusConverter );
	},
	fToCelsiusConverter: function(){
		var celsius;
		celsius = ( converter.fahrenheitTemp - 32 ) * ( 5 / 9 );
		return Math.round( celsius );
	},
	milesToKM: function(){
		var kilometers;
		kilometers = converter.fahrenheitTemp * 1.6;
		return kilometers;
	}
};
converter.init();
