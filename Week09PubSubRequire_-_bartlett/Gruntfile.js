module.exports = function( grunt )
{
    "use strict";
    grunt.initConfig( {
			jshint : {
				files : ['**/*.js'],

				options : {
					ignores : ['**/jquery*.js',
					'**/jasmine*.js',
					'Library/*.js',
					'**/angular.js',
					'**/angular-mocks.js',
					'**/coverage/**',
					'**/node_modules/**',
                    '**/require.js',
                    '**/TinyPubSub.js' ],
					reporter : 'checkstyle',
					reporterOutput : 'result.xml',
					strict : true,
					newcap : false,
					globals : {
						describe : true,
						afterEach : true,
						beforeEach : true,
						inject : true,
						it : true,
						jasmine : true,
						expect : true,
						angular : true,
						module : true,
						Crafty : true
				}
			}
		}
	} );
	grunt.loadNpmTasks('grunt-contrib-jshint');
};
