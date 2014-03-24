/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.11.0.min",
    "awsui": "AwsUi",
    "clientMongo": "ClientMongo"
  }
});

require(["awsui"], function(awsui) { 'use strict';
	console.log("Main called.");
	awsui();
});
