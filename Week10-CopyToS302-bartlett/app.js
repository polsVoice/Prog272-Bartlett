/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var walkDirs = require("./Source/WalkDirs").walkDirs;
var s3Code = require("./Source/S3Code");
var fs = require("fs");
var exec = require('child_process').exec;
var qm = require( "./Source/QueryMongo" );
var queryMongo = qm.QueryMongo;

var app = express();

// all environments
app.set('port', process.env.PORT || 30025);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Source')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.favicon('Images/favicon16.ico'));
// app.use(express.favicon(path.join(__dirname, 'favicon16.ico')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(request, response) { 'use strict';
    var html = fs.readFileSync(__dirname + '/public/index.html');
    response.writeHeader(200, {"Content-Type": "text/html"});   
    response.write(html);
    response.end();
});

//app.get('/', routes.index);
// app.get('/users', user.list);

/*
 * You will need to edit one or more objects in Options.json. 
 * They have this general format

var options = {
		pathToConfig: '/home/charlie/config.json',		
		reallyWrite: true, 
		bucketName: 'bucket01.elvenware.com',
		folderToWalk: "Files",
		s3RootFolder: "FilesTwo",
		createFolderToWalkOnS3: true,
		createIndex: true,
		filesToIgnore: ['Thumbs.db', '.gitignore', 'MyFile.html']
};
 
 * Before filling it out, see the README file for this project. 
 */	

app.get('/getOptions', function(request, response) {'use strict';
	var options = fs.readFileSync("Options.json", 'utf8');
	options = JSON.parse(options);
	response.send(options);
});

app.get( "/listBuckets", function( request, response )
{
    "use strict";
    console.log( "listBuckets called" );
    console.log( request.query );
    var path = request.query.path;
    console.log( "listBuckets: ", path );
    s3Code.loadConfig( path );
    s3Code.listBuckets( response, true );
} );

app.get('/copyToS3', function(request, response) {'use strict';
	console.log(typeof request.query.options);	
	var options = JSON.parse(request.query.options);
    console.log(options);
	walkDirs(options, response);
});

var buildAll = function( response, path, index )
{
    "use strict";
    console.log( "buildAll was called" );
    var command = path + " MarkdownTransform.py -i " + index;
    try
    {
        exec( command, function callback( error, stdout, stderr )
        {
            console.log( "convertToHtml was called er: ", error );
            console.log( "convertToHtml was called so: ", stdout );
            console.log( "convertToHtml was called se: ", stderr );
            response.send( { "result": "Success", "data": stdout } );
        } );
    }
    catch( e )
    {
        console.log( e.message );
        response.send( { "result": "error", "data": e } );
    }
};

app.get( "/buildAll", function( request, response )
{
    "use strict";
    console.log( "buildAll called" );
    buildAll( response, request.query.pathToPython, request.query.index );
} );

// initial database insert

app.get('/insertData', function(request, response) { 'use strict';
    var collectionName = request.query.collectionName;
    console.log('Write called: ' + collectionName);    
    var fileName = collectionName + '.json';
    console.log( "File name is " + fileName );
    var fileContent = fs.readFileSync(fileName, 'utf8');
    console.log( "File content is " + fileContent );
    queryMongo.insertIntoCollection(response, collectionName, JSON.parse(fileContent));  
});

app.get('/read', function(request, response) { 'use strict';
	console.log('read route called');
	var collectionName = request.query.collectionName;
	console.log('request.query.collectionName: ', collectionName);
	queryMongo.getCollectionData(response, collectionName);	
});

app.get( "/update", function( request, response )
{
    "use strict";
    console.log( "/update called" );
    console.log( "collection is " + request.query.collectionName );
    console.log( request.query.update );
    console.log( "id is " + request.query.id );
    queryMongo.updateCollection( response, request.query.id, request.query.update,
                                    request.query.collectionName );
} );

http.createServer(app).listen(app.get('port'), function() {'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});
