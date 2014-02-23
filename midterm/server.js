var express = require( "express" );
var app = express();
var MongoClient = require( "mongodb" ).MongoClient;
var fs = require( "fs" );

var url01 = "mongodb://127.0.0.1:27017/test";
var url02 = "mongodb://192.168.2.19:27017/test";
