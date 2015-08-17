module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                assets: './src/',
                data: ['./src/core/data/*.{json,yml}', './src/data/*.{json,yml}'],
                layoutdir: './src/layouts/',
                layout: false,
                partials: [
                    './src/core/layouts/**/*.hbs',
                    './src/core/partials/**/*.hbs',
                    './src/layouts/**/*.hbs',
                    './src/partials/**/*.hbs'
                ]
            },
            site: {
                expand: true,
                cwd: './src/views/',
                src: ['**/*.hbs'],
                dest: './build'
            }
        },

        browserSync: {
            files: {
                src: ['./build/**/*.html', './build/**/*.css', './build/**/*.js'],
            },
            options: {
                watchTask: true,
                server: './build'
            }
        },

        clean: {
            build: ['./build/**/*.html', './build/js', './build/css', './build/img'],
            dist: ['./dist/**/*.html', './dist/**/*.js', './dist/**/*.css', './dist/**/*.{jpg,gif,png}']
        },

        compass: {
            build: {
                options: {
                    sassDir: './src/styles/',
                    cssDir: './build/css/',
                    environment: 'development',
                    require: 'bootstrap-sass'
                }
            },
            dist: {
                options: {
                    sassDir: './src/styles/',
                    cssDir: './dist/css/',
                    environment: 'production',
                    require: 'bootstrap-sass'
                }
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: './src/core/javascript/',
                    src: '**/*',
                    dest: './build/js/'
                },{
                    expand: true,
                    cwd: './src/javascript/',
                    src: '**/*',
                    dest: './build/js/'
                }, {
                    expand: true,
                    cwd: './src/images/',
                    src: '**/*',
                    dest: './build/img/'
                }, {
                    expand: true,
                    cwd: './src/fonts/',
                    src: '**/*',
                    dest: './build/css/fonts/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './build/',
                    src: '**/*.html',
                    dest: './dist/'
                }, {
                    expand: true,
                    cwd: './src/fonts/',
                    src: '**/*',
                    dest: './dist/css/fonts/'
                }]
            },
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: './build/',
                    src: ['**/*.jpg'],
                    dest: './dist/',
                    ext: '.jpg'
                }, {
                    expand: true,
                    cwd: './build/',
                    src: ['**/*.png'],
                    dest: './dist/',
                    ext: '.png'
              }]
            }
        },
        
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './dist/',
                    src: '**/*.html',
                    dest: './dist/'
              }]
            }
        },

        'string-replace': {
            build: {
                files: {
                    './build/': ['./build/**/*.js']
                },
                options: {
                    replacements: [{
                        pattern: /javascript\//g,
                        replacement: 'js/'
                    }]
                }
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './build/js',
                    src: '**/*.js',
                    dest: './dist/js',
                    ext: '.min.js'
              }]
            }
        },

        watch: {
            css: {
                files: ['./src/**/*.scss'],
                tasks: ['compass:build']
            },
            font: {
                files: ['./src/**/*.{otf,ttf,woff,eot,svg}'],
                tasks: ['copy:build'],
            },
            html: {
                files: ['./src/**/*.hbs'],
                tasks: ['assemble']
            },
            images: {
                files: ['./src/**/*.{jpg,gif,png}'],
                tasks: ['copy:build'],
            },
            javascript: {
                files: ['./src/**/*.js'],
                tasks: ['copy:build', 'string-replace:build'],
            },
            json: {
                files: ['./src/**/*.json'],
                tasks: ['assemble']
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-string-replace');

    // Register the default tasks.
    grunt.registerTask('default', ['clean:build', 'assemble', 'compass:build', 'copy:build', 'string-replace:build', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean:build', 'assemble', 'compass:build', 'copy:build', 'string-replace:build']);
    grunt.registerTask('dist', ['clean:dist', 'compass:dist', 'copy:dist', 'imagemin:dist', 'uglify:dist', 'processhtml']);
};