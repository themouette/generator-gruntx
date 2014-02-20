// ## Build the frontend javascript
//
// Just include '<%%= config.public.mainjs %>' script in your html and your app
// is ready to be served.
//
// In **dev** mode, kernel is concatenated continuously with requirejs and
// configuration file so dependencies are lazy loaded.
//
// For **release**, files are combined and compressed to deliver a single file
// to your users.
module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('requirejs-config', 'Process requirejs config file and prepend it to dest', function () {
        var options = this.options({
            dest: '<%%= config.public.mainjs %>',
            src: '<%%= config.www.requireConfig %>'
        });
        var content;

        if (!grunt.file.exists(options.dest)) {
            content = '';
        } else {
            content = grunt.file.read(options.dest);
        }

        var src = grunt.file.read(options.src);
        src = grunt.template.process(src, {data: options});

        grunt.file.write(options.dest, [src, content].join(';'));
    });

    grunt.extendConfig({
        'clean': {
            'mainjs': ['<%%= config.public.mainjs %>']
        },
        'browserify': {
            '<%%= config.public.mainjs %>': '<%%= config.www.js %>/kernel.js'
        },
        'watch': {
            'app-dev': {
                'files': [ '<%%= config.www.js %>/**/*.js' ],
                'tasks': ['app:dev:build']
            }
        }
    });

    grunt.registerTask('app:dev:build', 'local build', [
        // clean '<%%= config.public.mainjs %>' file.
        'clean:mainjs',
        // generate main file from kernel.
        'browserify'
    ]);

    grunt.registerTask('app:dev', 'build application for development environment', [
        'app:dev:build',
        // start watcher
        'watch:app-dev'
    ]);
    grunt.registerTask('app:release', 'build application for development environment', [
        // clean '<%%= config.public.mainjs %>' file.
        'clean:mainjs',
        // generate main file from kernel.
        'browserify'
    ]);
};

