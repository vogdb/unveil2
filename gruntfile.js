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
        banner: '/** <%= pkg.title %> - <%= pkg.homepage %> **/\n',


        /**
         * JSHint.
         *
         * @github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            files: ['Gruntfile.js', 'jquery.unveil2.js'],
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
                    'jquery.unveil2.min.js': ['jquery.unveil2.js']
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
                    urls: [
                        'http://localhost:8000/test/tests.html'
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
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        }
    });


    /**
     * Default task.
     *
     * run `grunt build`
     */
    grunt.registerTask('build', [
        'jshint',
        'connect',
        'qunit',
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