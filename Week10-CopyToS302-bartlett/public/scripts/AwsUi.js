define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;
    var transformOptions = null;
    var dataIndex = 0;
    var dataIndexTransform = 0;
    
    var collections = [ "MarkdownTransformConfig", "Options" ];
    
    function AwsUi() {
        $( "#insertData" ).click( insertData );
        $( "#readData" ).click( readData );
        $("#listBuckets").click(listBuckets);
        $("#copyToS3").click(copyToS3);
        $("#getOptions").click(getOptions);
        $("#transformForwardButton").click(forwardTransform);
        $("#tranformBackButton").click(backwardTransform);
        $("#forwardButton").click(forward);
        $("#backButton").click(backward);

        $("#buildAll").click(buildAll);
        readData();
        //getBuildConfig();
        //getOptions();
    }
    
    var displayDocument = function( document )
    {
        if( typeof document !== "undefined" )
        {
            $( "#pathToPython" ).val( document.pathToPython );
            $( "#copyFrom" ).val( document.copyFrom );
            $( "#copyTo" ).val( document.copyTo );
            $( "#filesToCopy" ).val( document.filesToCopy );
            $( "#pathToConfig" ).val( document.pathToConfig );
            $( "#reallyWrite" ).val( document.reallyWrite );
            $( "#bucketName" ).val( document.bucketName );
            $( "#folderToWalk" ).val( document.folderToWalk );
            $( "#s3RootFolder" ).val( document.s3RootFolder );
            $( "#createFolderToWalkOnS3" ).val( document.createFolderToWalkOnS3 );
            $( "#createIndex" ).val( document.createIndex );
            $( "#filesToIgnore" ).val( document.filesToIgnore );            
        }
    };
    
    var insertData = function()
    {
        console.log( "Insert Data button!" );
        for( var i = 0, ii = collections.length; i < ii; i++ )
        {
            doInsert( "/insertData", i );
        }
    };
    
	var doInsert = function(route, index) {
		$.getJSON(route, {
			collectionName : collections[index]
		}, function(data) {
			console.log(data);
		});
	};
    
    var readData = function()
    {
        readTransformConfig();
        readOptions();
    };
    
    var readTransformConfig = function()
    {
        $.getJSON( "/read", 
        { collectionName: collections[ 0 ] },
        function( data )
        {
            if( dataIndexTransform >= data.length )
            {
                dataIndexTransform = 0;
            }
            else if( dataIndexTransform < 0 )
            {
                dataIndexTransform = data.length-1;
            }
            displayTransformConfig( data[ dataIndexTransform ] );
        } );
    };
    
    var readOptions = function()
    {
        $.getJSON( "/read", 
        { collectionName: collections[ 1 ] },
        function( data )
        {
            if( dataIndex >= data.length )
            {
                dataIndex = 0;
            }
            else if( dataIndex < 0 )
            {
                dataIndex = data.length-1;
            }
            displayOptions( data[ dataIndex ] );
        } );
    };
        
    /*
    var insertData = function()
    {
        console.log( "insertData called" );
        $.publish( "insertData", function( data )
        {
            console.log( "insertData published" );
            
            // combine JSON objects
            var configData = $.extend( {}, data[ 0 ], data[ 3 ] );
            displayDocument( configData );
        } );
    };
    */

    var buildAll = function() {
        $.getJSON("/buildAll", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };

    var copyToS3 = function() {
        $.getJSON("/copyToS3", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyResult").html("Result: " + data.result);
        });
    };

    var displayTransformConfig = function(options) {
        $("#pathToPython").val(options.pathToPython);
        $("#copyFrom").val(options.copyFrom);
        $("#copyTo").val(options.copyTo);
        $("#filesToCopy").val(options.filesToCopy);
    };

    var displayOptions = function(options) {
        $("#currentDocument").html(dataIndex + 1);
        $("#pathToConfig").val(options.pathToConfig);
        $("#reallyWrite").val(options.reallyWrite ? "true" : "false");
        $("#bucketName").val(options.bucketName);
        $("#folderToWalk").val(options.folderToWalk);
        $("#s3RootFolder").val(options.s3RootFolder);
        $("#createFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
        $("#createIndex").val(options.createIndex ? "true" : "false");
        $("#filesToIgnore").val(options.filesToIgnore);
    };

    var getBuildConfig = function() {
        $.getJSON("/getBuildConfig", function(optionsInit) {
            transformOptions = optionsInit;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    var getOptions = function() {
        $.getJSON("/getOptions", function(optionsInit) {
            options = optionsInit;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
/*
    var forwardTransform = function() {
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };
    */
    
    var forwardTransform = function()
    {
        dataIndexTransform++;
        readTransformConfig();
    };
/*
    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };
    */
    
    var backwardTransform = function()
    {
        dataIndexTransform--;
        readTransformConfig();
    }
/*
    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };
    */
    
    var forward = function()
    {
        dataIndex++;
        readOptions();
    };

/*
    var backward = function() {
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };
    */
    
    var backward = function()
    {
        dataIndex--;
        readOptions();
    };

    var listBuckets = function() {
        var pathToConfig = $( "#pathToConfig" ).val();
        console.log( "pathToConfig is " + pathToConfig );
        $.getJSON("/listBuckets", {
            path: pathToConfig
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
