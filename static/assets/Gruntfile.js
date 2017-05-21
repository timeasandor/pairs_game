module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            build:{
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },

        cmq: {
            options: {
                log: false
            },
            build: {
                files: {
                    'css': ['css/style.raw.css']
                }
            }
        },

        cssmin: {
            build: {
                src: 'css/style.raw.css',
                dest: 'css/style.css'
            }
        },

        uglify: {
            custom: {
                files: {
                    'js/app.min.js': [
                        'js/toMinify/_game.js',
                        'js/toMinify/_start_screen.js',
                        'js/toMinify/_timer.js',
                        'js/toMinify/_score.js'
                    ]
                }
            },
            vendor: {
                files: {
                    'js/vendor.min.js': [
                        'js/toMinify/vendor/jquery.min.js',
                        'js/toMinify/vendor/modernizr.custom.92950.js'
                    ]
                }
            }
        },

        watch: {
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['compass','cmq', 'cssmin']
            },
            js: {
                files: ['js/toMinify/*.js','js/toMinify/**/*.js'],
                tasks: ['uglify:custom']
            },
            js_vendor: {
                files: ['js/toMinify/vendor/*.js'],
                tasks: ['uglify:vendor']
            }
        }
    });

//watcher
    grunt.loadNpmTasks('grunt-contrib-watch');

//css
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-combine-media-queries');

//js
    grunt.loadNpmTasks('grunt-contrib-uglify');

// Default task(s).
    grunt.registerTask('default', ['compass','cmq','cssmin','uglify']);
};