'use strict';

module.exports = function(grunt) {

	var variables = {
		less: 'styles',
        css: 'styles',
        js: 'scripts'
	};
	grunt.initConfig({
		variables: variables,
		pkg: grunt.file.readJSON('package.json'),

/* ====================================
	JAVASCRIPT concatenation
==================================== */
		concat: {
			options: {
				stripBanners: true
			},
			frontend: {
				src: ['<%= variables.js %>/dev/*.js'],
				dest: '<%= variables.js %>/.tmp/main.js'
			}
		},

/* ====================================
	UGLIFY
==================================== */
		uglify: {
			options: {
				mangle: false
			},
			frontend: {
				files: [{
					expand: true,
					cwd: '<%= variables.js %>/.tmp',
                    src: ['*.js'],
					dest: '<%= variables.js %>'
				}]
			}
		},

/* ====================================
	LESS compilation
==================================== */
		less: {
            frontend: {
              files: [
                {
                  expand: true,
                  cwd: 'styles/',
                  src: ['*.less'],
                  dest: 'styles/.tmp',
                  ext: '.css'
                }
              ]
            }
        },

/* ====================================
	CSS minification
==================================== */
        
        cssmin: {
            frontend: {
              files: [
                {
                  expand: true,
                  cwd: '<%= variables.css %>/.tmp',
                  src: ['*.css'],
                  dest: 'styles'
                }
              ]        
            }
        },

/* ====================================
	Watch Task
==================================== */

        watch: {
            files: ['<%= variables.less %>/*', '<%= variables.js %>/*', '*.html'],
            tasks: ['default']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', [
		'concat',
		'uglify',
        'less',
        'cssmin'
	]);
    
};