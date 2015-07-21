module.exports = function (grunt) {
	"use strict";
	grunt.initConfig({
		exec: {
			webpack: 'webpack --watch &'
		},
		"http-server": {
			dev: {
				root: "./",
				port: 8000,
				host: "0.0.0.0",
				showDir: true,
				autoIndex: true,
				runInBackground: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-http-server');

	grunt.config("watch", require('./grunt/watch.js'));
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask("webpackWatch", ["exec:webpack"]);

	grunt.registerTask("default", ["http-server", "webpackWatch", "watch"]);
};