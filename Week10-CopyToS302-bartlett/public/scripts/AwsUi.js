define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;
    var transformOptions = null;
    var dataIndex = 0;
    var dataIndexTransform = 0;

    function AwsUi() {
        $( "#insertData" ).click( insertData );
        $("#listBuckets").click(listBuckets);
        $("#copyToS3").click(copyToS3);
        $("#getOptions").click(getOptions);
        $("#transformForwardButton").click(forwardTransform);
        $("#tranformBackButton").click(backwardTransform);
        $("#forwardButton").click(forward);
        $("#backButton").click(backward);

        $("#buildAll").click(buildAll);
        getBuildConfig();
        getOptions();
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
        console.log( "insertData called" );
        $.publish( "insertData", function( data )
        {
            console.log( "insertData published" );
            var configData = $.extend( {}, data[ 0 ], data[ 3 ] );
            displayDocument( configData );
        } );
    };

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
        $("#pathToPython").html(options.pathToPython);
        $("#copyFrom").html(options.copyFrom);
        $("#copyTo").html(options.copyTo);
        $("#filesToCopy").html(options.filesToCopy);
    };

    var displayOptions = function(options) {
        $("#currentDocument").html(dataIndex + 1);
        $("#pathToConfig").html(options.pathToConfig);
        $("#reallyWrite").html(options.reallyWrite ? "true" : "false");
        $("#bucketName").html(options.bucketName);
        $("#folderToWalk").html(options.folderToWalk);
        $("#s3RootFolder").html(options.s3RootFolder);
        $("#createFolderToWalkOnS3").html(options.createFolderToWalkOnS3 ? "true" : "false");
        $("#createIndex").html(options.createIndex ? "true" : "false");
        $("#filesToIgnore").html(options.filesToIgnore);
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

    var forwardTransform = function() {
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };

    var listBuckets = function() {
        $.getJSON("/listBuckets", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
