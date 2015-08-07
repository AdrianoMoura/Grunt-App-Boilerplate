'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
        ' * <%= pkg.name %> <%= pkg.version %>\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
        ' * The TOBE.com.br\n' +
        ' * http://www.tagweb.com.br/\n' +
        ' *\n' +
        ' * Licensed under <%= pkg.license.join(" & ") %>\n' +
        ' *\n' +
        ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
        '*/\n',

        // Task configuration.
        connect: {
            server: {
                options: {
                    hostname: '*'
                }
            }
        },
        open: {
            build: {
                path: 'http://localhost:8000/build'
            },
            dist: {
                path: 'http://localhost:8000/dist'
            }
        },
        clean: {
            build: {
                src: 'build/'
            },
            dist: {
                src: 'dist/'
            },
            apps: {
                src: ['phonegap/<%= pkg.name %>/www/','xdk/<%= pkg.name %>/www/']
            }
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'build/css/<%= pkg.name %>.css': ['src/less/*.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': ['src/less/*.less']
                }
            }
        },
        uglify: {
            build: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    banner: "<%= banner %>"
                },
                src: 'src/myapp/*.js',
                dest: 'build/js/<%= pkg.name %>.js'
            },
            dist: {
                options: {
                    banner: "<%= banner %>"
                },
                src: 'src/myapp/*.js',
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        watch: {
            build: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            }
        },
        imageEmbed: {
            build: {
                // src file
                src: ['build/css/<%= pkg.name %>.css'],
                // output dir
                dest: 'build/css/<%= pkg.name %>.css',
                options: {
                    deleteAfterEncoding: true,
                    maxImageSize: 0
                }
            },
            dist: {
                // src file
                src: ['dist/css/<%= pkg.name %>.css'],
                // output dir
                dest: 'dist/css/<%= pkg.name %>.css',
                options: {
                    deleteAfterEncoding: true,
                    maxImageSize: 0
                }
            }
        },
        jade: {
            build: {
                options: {
                    pretty: true,
                    data: function (dest, src) {
                        return require('./package.json');
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'build/',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    pretty: false,
                    data: function (dest, src) {
                        return require('./package.json');
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['img/**'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.css'],
                        dest: 'build/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.js'],
                        dest: 'build/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.map'],
                        dest: 'build/js/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['img/**'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.css'],
                        dest: 'dist/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.js'],
                        dest: 'dist/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.map'],
                        dest: 'dist/js/'
                    }
                ]
            },
            apps: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: 'xdk/<%= pkg.name %>/www/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: 'phonegap/<%= pkg.name %>/www/'
                    }
                ]
            }
        },
    });

    // Default task.
    this.registerTask('default', ['build']);

    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= pkg.name %>', [
        'clean:build',
        'copy:build',
        'uglify:build',
        'less:build',
        'jade:build',
        'imageEmbed:build',
        'clean:apps',
        'copy:apps',
        'server'
    ]);

    // Release
    this.registerTask('dist', 'Builds a distributable version of <%= pkg.name %>', [
        'clean:dist',
        'less:dist',
        'jade:dist',
        'copy:dist',
        'uglify:dist',
        'imageEmbed:dist',
        'clean:apps',
        'copy:apps',
    ]);

    grunt.registerTask('server', [
        'connect',
        'open:build',
        'watch:build'
    ]);

};
