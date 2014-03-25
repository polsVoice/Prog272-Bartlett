/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.11.0.min",
    "awsui": "AwsUi",
    "pubSub": "PubSubOn",
    "clientMongo": "ClientMongo"
  }
});

require( [ "jquery", "awsui", "pubSub", "clientMongo" ], 
    function(j, awsui, pubSub, clientMongo) { 'use strict';
	console.log("Main called.");
	awsui();
    clientMongo();
});
