module.exports = function (grunt) {

    /**
     * Initialize grunt.
     */
    grunt.initConfig({

        /**
         * Read package.json.
         */
        pkg: grunt.file.readJSON('package.json'),


        /**
         * Set banner.
         */
        banner: '// <%= pkg.title %> - <%= pkg.version %> - <%= pkg.homepage %>\n',


        /**
         * JSHint.
         *
         * @github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            files: ['Gruntfile.js', 'src/jquery.unveil2.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },


        /**
         * Minify.
         *
         * @github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            default: {
                files: {
                    'dist/jquery.unveil2.min.js': ['src/jquery.unveil2.js']
                }
            }
        },


        /**
         * QUnit
         *
         * @github.com/gruntjs/grunt-contrib-qunit
         */
        qunit: {
            default: {
                options: {
                    page: {
                        viewportSize : {
                            width: 800,
                            height: 200
                        }
                    },
                    console: true,
                    urls: [
                        'http://localhost:8000/test/jquery.html',
                        'http://localhost:8000/test/zepto.html'
                    ]
                }
            }
        },


        /**
         * Connect
         *
         * @github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            live: {
                options: {
                    port: 8000,
                    base: '.'
                }
            },
            test: {
                options: {
                    port: 8000,
                    base: '.',
                    keepalive: true,
                    debug: true
                }
            }
        }
    });


    /**
     * Test task.
     *
     * run `grunt test`
     */
    grunt.registerTask('test', [
        'jshint',
        'connect:live',
        'qunit'
    ]);


    /**
     * Build task.
     *
     * run `grunt build`
     */
    grunt.registerTask('build', [
        'test',
        'uglify'
    ]);


    /**
     * Load the plugins specified in `package.json`.
     */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
};