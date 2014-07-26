module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'regexp.js']
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js', '*.js'],
                tasks: ['jshint']
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task
    grunt.registerTask('default', ['watch', 'jshint']);
};
