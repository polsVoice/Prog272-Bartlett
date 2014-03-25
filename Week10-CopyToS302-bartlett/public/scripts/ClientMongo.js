// Handle Ajax and maintain list of data 
define('clientMongo', function() {
	'use strict';

	var mongoData = [];

	function ClientMongo() {
		console.log("Client Mongo constructor called");
        $.subscribe( "insertData", insertData );
        
		$.subscribe('getDocument', getDocument);
		$.subscribe('insertNewDocument', insertNewDocument);
		$.subscribe('readAll', readAll);
		$.subscribe('readCountDocuments', readCountDocuments);
		$.subscribe('readTwo', readTwo);
		$.subscribe('removeAll', removeAll);
		$.subscribe('update', update);
		$.subscribe('emptyMongoData', emptyMongoData)
	}
    
    var insertData = function( event, callback )
    {
        console.log( "insertData inside ClientMongo called!" );
        $.getJSON( "/insertData", function( data )
        {
            mongoData = mongoData.concat( data.mongoDocument );
            callback( data.mongoDocument, mongoData );
        } );
    };

	var getDocument = function(event, request) {
		request.callback(mongoData[request.index]);
	};

    var emptyMongoData = function(event, callback) {
        mongoData = [];
        callback();
    };

	var insertNewDocument = function(event, callback) {
		console.log("insert New Document called");
		$.getJSON('/insertJson', function(newData) {
			mongoData = mongoData.concat(newData.mongoDocument);
			callback(newData.mongoDocument, mongoData);
		});
	};

	var readAll = function(event, callback) {
		console.log("readAll called");
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			callback(data);
		});
	};

	var readTwo = function(event, callback) {
		console.log("readTwo called");
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			callback(data);
		});
	};

	var readCountDocuments = function(event, publishedRequest) {
		console.log("readTwo called");
		var request = {};
		request.numRequested = publishedRequest.numRequested;
		$.getJSON('/readDocuments', request, function(data) {
			mongoData = data;
			publishedRequest.callback(mongoData);
		});

	};

	var removeAll = function(event, callback) {
		$.getJSON('/removeAll', function(data) {
			callback(data);
		});
	};
	
	var update = function(event, updateDetails) {
	    var request = { 
	        query: { "firstName": updateDetails.oldString },
	        update: {
	            $set: { "firstName" : updateDetails.newString }
	        }         
	    };
	    $.getJSON('/update', request, function(data) {
	        data.mongoData = mongoData;
            updateDetails.callback(data);
        });
	};

	return ClientMongo;
});
