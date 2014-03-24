/**
 * @author Charlie Calvert
 */

require.config({
	paths : {
        "awsUi": "../Source/AwsUi.js",
		'clientMongo' : "../public/ClientMongo",
		'jasmine' : 'jasmine/jasmine',
		'jasmine-html' : 'jasmine/jasmine-html',
		'boot' : 'jasmine/boot',
		// 'jasmine-jquery' : 'Library/jasmine-jquery'
	},
	shim : {
		'jasmine' : {
			exports : 'jasmine'
		},
		'jasmine-html' : {
			deps : ['jasmine'],
			exports : 'jasmine'
		},
		'boot' : {
			deps : ['jasmine', 'jasmine-html'],
			exports : 'jasmine'
		}
	}
});

require(['jquery', 'boot'], function(j, b, c) {
	'use strict';
	// Load the specs
	require([ "client_spec" ], function() {
		console.log("Main called.");
		// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
		window.onload();
	});
});

