module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                assets: './src/',
                data: ['../../amuse/data/*.{json,yml}', './src/data/*.{json,yml}'],
                layoutdir: './src/layouts/',
                layout: false,
                partials: [
                    '../../amuse/layouts/**/*.hbs',
                    '../../amuse/partials/**/*.hbs',
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
            build: {
                files: {
                    src: ['./build/**/*.html', './build/**/*.css', './build/**/*.js'],
                },
                options: {
                    watchTask: true,
                    server: './build'
                }
            },
            dist: {
                files: {
                    src: ['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'],
                },
                options: {
                    server: './dist'
                }
            }
        },

        clean: {
            build: ['./build/**/*'],
            dist: ['./dist/**/*.html', './dist/**/*.js', './dist/**/*.css', './dist/**/*.{jpg,gif,png}']
        },

        compass: {
            build: {
                options: {
                    sassDir: './src/styles/',
                    cssDir: './build/css/',
                    imagesDir: './src/images/',
                    environment: 'development',
                    require: 'bootstrap-sass'
                }
            },
            dist: {
                options: {
                    sassDir: './src/styles/',
                    cssDir: './dist/css/',
                    imagesDir: './src/images/',
                    environment: 'production',
                    require: 'bootstrap-sass'
                }
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '../../amuse/javascript/',
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
                }, {
                    expand: true,
                    cwd: './src/assets/',
                    src: '**/*',
                    dest: './build/assets/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/core/javascript/libs/',
                    src: '**/*.js',
                    dest: 'dist/javascript/libs/',
                    ext: '.min.js'
                },{
                    expand: true,
                    cwd: 'src/core/javascript/plugins/',
                    src: '**/*.js',
                    dest: 'dist/javascript/plugins/',
                    ext: '.min.js'
                },{
                    expand: true,
                    cwd: 'src/core/javascript/vendors/',
                    src: '**/*.js',
                    dest: 'dist/javascript/vendors/',
                    ext: '.min.js'
                },{
                    expand: true,
                    cwd: 'build/',
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
            },
            dist: {
                files: {
                    'dist/js/app.min.js': ['build/js/app.js'],
                    'dist/js/main.min.js': ['build/js/main.js'],
                    'dist/': ['dist/js/components/*.min.js', 'dist/js/models/*.min.js', 'dist/js/views/*.min.js']
                },
                options: {
                    replacements: [{
                        pattern: /\.js/g,
                        replacement: '.min.js'
                    }]
                }
            },
            images: {
                files: {
                    './build/': ['./build/**/*.css', './build/**/*.html', './build/**/*.js']
                },
                options: {
                    replacements: [{
                        pattern: /images\//g,
                        replacement: 'img/'
                    }]
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [{
                    'dist/javascript/app.min.js': ['build/javascript/app.js'],
                    'dist/javascript/main.min.js': ['build/javascript/main.js'],
                    'dist/javascript/debug.min.js': ['build/javascript/debug.js']
              },{
                    expand: true,
                    cwd: 'build/javascript/components',
                    src: '**/*.js',
                    dest: 'dist/javascript/components',
                    ext: '.min.js'
              },{
                    expand: true,
                    cwd: 'build/javascript/models',
                    src: '**/*.js',
                    dest: 'dist/javascript/models',
                    ext: '.min.js'
              },{
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
                tasks: ['compass:build', 'string-replace:images']
            },
            font: {
                files: ['./src/**/*.{otf,ttf,woff,eot,svg}'],
                tasks: ['copy:build'],
            },
            html: {
                files: ['./src/**/*.hbs'],
                tasks: ['assemble', 'string-replace:images']
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
    grunt.registerTask('default', ['clean:build', 'assemble', 'compass:build', 'copy:build', 'string-replace:build', 'string-replace:images', 'browserSync:build', 'watch']);
    grunt.registerTask('build', ['clean:build', 'assemble', 'compass:build', 'copy:build', 'string-replace']);
    grunt.registerTask('dist', ['clean:dist', 'compass:dist', 'copy:dist', 'imagemin:dist', 'uglify:dist', 'processhtml', 'string-replace:dist']);
    grunt.registerTask('server', ['browserSync:dist']);
};
