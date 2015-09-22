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
        app: grunt.file.readJSON('myapp.json'),
        banner: '/*\n' +
        ' * <%= app.name %> <%= app.version %>\n' +
        ' * <%= app.description %>\n' +
        ' *\n' +
        ' * <%= app.homepage %>\n' +
        ' *\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= app.author %>\n' +
        ' * The <%= app.author %> - <%= app.author_email %>\n' +
        ' * <%= app.author_homepage %>\n' +
        ' *\n' +
        ' * Licensed under <%= app.license.join(" & ") %>\n' +
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
                path: 'http://localhost:8000/www'
            },
            dist: {
                path: 'http://localhost:8000/www'
            }
        },
        clean: {
            build: {
                src: 'www/'
            },
            dist: {
                src: 'www/'
            }
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'www/css/<%= app.name.replace(/ /g,"_") %>.css': ['src/less/*.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'www/css/<%= app.name.replace(/ /g,"_") %>.min.css': ['src/less/*.less']
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
                dest: 'www/js/<%= app.name.replace(/ /g,"_") %>.js'
            },
            dist: {
                options: {
                    banner: "<%= banner %>"
                },
                src: 'src/myapp/*.js',
                dest: 'www/js/<%= app.name.replace(/ /g,"_") %>.js'
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
                src: ['www/css/<%= app.name.replace(/ /g,"_") %>.css'],
                // output dir
                dest: 'www/css/<%= app.name.replace(/ /g,"_") %>.css',
                options: {
                    deleteAfterEncoding: true,
                    maxImageSize: 0
                }
            },
            dist: {
                // src file
                src: ['www/css/<%= app.name.replace(/ /g,"_") %>.css'],
                // output dir
                dest: 'www/css/<%= app.name.replace(/ /g,"_") %>.css',
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

                        var appData = grunt.file.readJSON('myapp.json');

                        appData.title = appData.name;
                        appData.name = appData.name.replace(/ /g,'_');

                        return(appData);
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'www/',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    pretty: false,
                    data: function (dest, src) {
                        return require('./myapp.json');
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'www/',
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
                        dest: 'www/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.css'],
                        dest: 'www/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.js'],
                        dest: 'www/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.map'],
                        dest: 'www/js/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['img/**'],
                        dest: 'www/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.css'],
                        dest: 'www/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.js'],
                        dest: 'www/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/lib/',
                        src: ['*.map'],
                        dest: 'www/js/'
                    }
                ]
            },
            phonegap: {
                files: [
                    {
                        expand: true,
                        cwd: 'www/',
                        src: ['**'],
                        dest: 'phonegap/www'
                    }
                ]
            }
        },
        phonegap: {
            config: {
                root: 'www',
                config: function(){
                    var app = grunt.file.readJSON('myapp.json');

                    var con = {
                        template: '.phonegap_config.xml',
                        data: app
                    }

                    return(con);
                },
                cordova: 'phonegap/.cordova',
                html : 'index.html', // (Optional) You may change this to any other.html
                path: 'phonegap',
                plugins: function(){
                    var app = grunt.file.readJSON('myapp.json');
                    return(app.phonegap_plugins);
                },
                platforms: function(){
                    var app = grunt.file.readJSON('myapp.json');
                    return(app.platforms);
                },
                maxBuffer: 200, // You may need to raise this for iOS.
                verbose: false,
                releases: 'releases',
                releaseName: function(){
                    var app = grunt.file.readJSON('myapp.json');
                    return(app.name + '-' + app.version);
                },
                debuggable: false,

                // Must be set for ios to work.
                // Should return the app name.
                name: function(){
                    var app = grunt.file.readJSON('myapp.json');
                    return app.name;
                },

                // Add a key if you plan to use the `release:android` task
                // See http://developer.android.com/tools/publishing/app-signing.html
                key: {
                    store: 'release.keystore',
                    alias: 'release',
                    aliasPassword: function(){
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    },
                    storePassword: function(){
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    }
                },

                // Set an app icon at various sizes (optional)
                 icons: {
                     android: {
                         ldpi: 'res/icon/android/icon-36-ldpi.png',
                         mdpi: 'res/icon/android/icon-48-mdpi.png',
                         hdpi: 'res/icon/android/icon-72-hdpi.png',
                         xhdpi: 'res/icon/android/icon-96-xhdpi.png'
                     },
                     wp8: {
                         app: 'res/icon/windows-phone/icon-62-tile.png',
                         tile: 'res/icon/windows-phone/icon-173-tile.png'
                     },
                     ios: {
                         icon29: 'res/icon/ios/icon29.png',
                         icon29x2: 'res/icon/ios/icon29x2.png',
                         icon40: 'res/icon/ios/icon40.png',
                         icon40x2: 'res/icon/ios/icon40x2.png',
                         icon57: 'res/icon/ios/icon57.png',
                         icon57x2: 'ires/icon/ios/con57x2.png',
                         icon60x2: 'res/icon/ios/icon60x2.png',
                         icon72: 'res/icon/ios/icon72.png',
                         icon72x2: 'res/icon/ios/icon72x2.png',
                         icon76: 'res/icon/ios/icon76.png',
                         icon76x2: 'res/icon/ios/icon76x2.png'
                     }
                 },

                // Set a splash screen at various sizes (optional)
                // Only works for Android and IOS
                screens: {
                     android: {
                         ldpi: 'res/screen/android/screen-ldpi-portrait.png',
                         // landscape version
                         ldpiLand: 'res/screen/android/screen-ldpi-landscape.png',
                         mdpi: 'res/screen/android/screen-mdpi-portrait.png',
                         // landscape version
                         mdpiLand: 'res/screen/android/screen-mdpi-landscape.png',
                         hdpi: 'res/screen/android/screen-hdpi-portrait.png',
                         // landscape version
                         hdpiLand: 'res/screen/android/screen-hdpi-landscape.png',
                         xhdpi: 'res/screen/android/screen-xhdpi-portrait.png',
                         // landscape version
                         xhdpiLand: 'res/screen/android/screen-xhdpi-landscape.png'
                     },
                     ios: {
                         // ipad landscape
                         ipadLand: 'res/screen/ios/screen-ipad-landscape.png',
                         ipadLandx2: 'res/screen/ios/screen-ipad-landscape-2x.png',
                         // ipad portrait
                         ipadPortrait: 'res/screen/ios/screen-ipad-portrait.png',
                         ipadPortraitx2: 'res/screen/ios/screen-ipad-portrait-2x.png',
                         // iphone portrait
                         iphonePortrait: 'res/screen/ios/screen-iphone-portrait.png',
                         iphonePortraitx2: 'res/screen/ios/screen-iphone-portrait-2x.png',
                        iphone568hx2: 'res/screen/ios/screen-iphone-568h-2x.png'
                     }
                 },

                // iOS7-only options that will make the status bar white and transparent
                iosStatusBar: 'WhiteAndTransparent',

                // If you want to use the Phonegap Build service to build one or more
                // of the platforms specified above, include these options.
                // See https://build.phonegap.com/
                //remote: {
                //    username: 'your_username',
                //    password: 'your_password',
                //    platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
                //},

                // Set an explicit Android permissions list to override the automatic plugin defaults.
                // In most cases, you should omit this setting. See 'Android Permissions' in README.md for details.
                permissions: ['INTERNET', 'ACCESS_COURSE_LOCATION', '...']
            }
        }
    });

    //platform
    var platform = grunt.option('platform') || 'android';

    // Default task.
    this.registerTask('default', ['default']);

    // Build a new version of the library
    this.registerTask('default', 'Builds a development version of <%= app.name %>', [
        'build',
        'copy:phonegap',
        'server'
    ]);

    this.registerTask('dist', 'Builds a development version of <%= app.name %>', [
        'build-dist',
        'copy:phonegap',
        'server'
    ]);

    // Build a new version of the library
    this.registerTask('phonegap', 'Builds a development version of <%= app.name %>', [
        'build',
        'phonegap:build:' + platform
    ]);

    // Build a new version of the library
    this.registerTask('phonegap-run', 'Builds a development version of <%= app.name %>', [
        'build',
        'phonegap:build:' + platform,
        'phonegap:run:' + platform
    ]);


    // TASK CONFIG
    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= app.name %>', [
        'clean:build',
        'copy:build',
        'uglify:build',
        'less:build',
        'jade:build',
        'imageEmbed:build',
    ]);

    // Build a new version of the library
    this.registerTask('build-dist', 'Builds a development version of <%= app.name %>', [
        'clean:dist',
        'copy:dist',
        'uglify:dist',
        'less:dist',
        'jade:dist',
        'imageEmbed:dist',
    ]);

    grunt.registerTask('server', [
        'connect',
        'open:build',
        'watch:build'
    ]);

};
