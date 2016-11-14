/*global module */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        // read in the project settings from the package.json file into the pkg property
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                src: ["app/**/*.ts"],
                outDir: "dist"
            }
        },
        watch: {
            files: ["app/**/*.ts"],
            tasks: ["ts"],
            options: {
                livereload: true,
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                //files: { 'Content/style.scss': 'dist/style.css' }
                files: [{
                    expand: true,
                    src: ['Content/*.scss'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        }

        // define configuration for each of the tasks we have
        // this is a sample jshint task config
        /*
            jshint: {
                    // define the files to lint
                    files: ['gruntfile.js', 'src/*.js', '/*.js'],
                    // configure JSHint (documented at http://www.jshint.com/docs/)
                    options: {
                    // more options here if you want to override JSHint defaults
                    globals: {
                            jQuery: true,
                            console: true,
                            module: true
                            }
                        }
                    }
        */
    });

    // Add all plugins that your project needs here
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-sass');

    // this would be run by typing "grunt test" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('test', []);

    // define the default task that can be run just by typing "grunt" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('default', ["ts", "sass", "watch"]);
};