// Generated on 2013-08-27 using generator-angular 0.4.0
'use strict';
var path = require('path');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },
        connect: {
            options: {
                port: 8000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            },
            proxies: [
                {
                    context: '/rest',
                    host: 'localhost',
                    port: 9001
                }
            ],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            },
            coverage: {
                options: {
                    base: 'coverage/',
                    port: 5555,
                    keepalive: true
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            },
            coverage: {
                path: 'http://localhost:5555'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= yeoman.dist %>/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       '<%= yeoman.app %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        express: {
            livereload: {
                options: {
                    port: 9001,
                    monitor: {},
                    debug: true,
                    server: path.resolve('./server/index')
                }
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/{,*/}*.{gif,webp}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'copy:styles'
            ],
            test: [
                'coffee',
                'copy:styles'
            ],
            dist: [
                'coffee',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_auto: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                singleRun: false
            },
            unit_coverage: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                  'app/scripts/**/*.js': ['coverage']
                },
                coverageReporter: {
                  type : 'cobertura',
                  dir : 'coverage/',
                  file : 'coverage.xml'
                }
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/scripts',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/scripts'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'configureProxies',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'express',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    //autotest and watch tests
    grunt.registerTask('autotest', [
        'karma:unit_auto'
    ]);

    //coverage testing
    grunt.registerTask('test:coverage', ['karma:unit_coverage']);
    grunt.registerTask('coverage', ['karma:unit_coverage','open:coverage','connect:coverage']);
};