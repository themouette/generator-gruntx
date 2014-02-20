// ## Style task
//
// Manage styles. By default sass files available in `<%%= config.www.sass %>`
// are processed.
//
// * **style:dev** compiles stylesheets files and watch files for change.
// * **style:release** compiles stylesheets files and optimize for prodution.
module.exports = function (grunt) {
    "use strict";

    var dev = [];
    var release = [];
<% if ("foundation" === framework) { %>
    // configure foundation
    grunt.extendConfig({
        "copy": {
            "foundation-icons": {
                "files": {<% _.forEach(['eot','ttf','svg','woff'], function (ext) { %>
                    "<%%= config.public.font %>/foundation-icons.<%= ext %>": "<%%= config.www.bower %>/foundation-icon-fonts/foundation-icons.<%= ext %>",<% }) %>
                }
            }
        }
    });
    dev.push('copy:foundation-icons');
    release.push('copy:foundation-icons');
<% } %>

<% if ("sass" === preprocessor) { %>
    // This is the sass configuration section.
    // This might work out of the box.
    grunt.extendConfig({
        "sass": {
            "options": {<% if ("foundation" === framework) { %>
                // foundation
                // If not already installed, just install through bower:
                //
                // `bower install --save-dev foundation foundation-icon-fonts`
                "includePaths": [
                    "<%%= config.www.bower %>/foundation/scss/",
                    "<%%= config.www.bower %>/foundation-icon-fonts/"
                ]
                <% } else if ("bourbon" === framework) { %>
                // bourbon
                // If not already installed, just install through gem:
                //
                // `npm install --save-dev node-bourbon`
                "includePaths": require('node-bourbon').includePaths
                <% } else if ("bootstrap" === framework) { %>
                // foundation
                // If not already installed, just install through bower:
                //
                // `bower install --save-dev foundation`
                "includePaths": ["<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/stylesheets/"]
                <% } else { %>
                // Add external paths to load.
                // refer to grunt-sass task doc: https://github.com/sindresorhus/grunt-sass
                "includePaths": []
            <% } %>},
            "all": {
                "files": [{
                    "expand": true,
                    "cwd": "<%%= config.www.sass %>",
                    "src": "**/*.scss",
                    "dest": "<%%= config.public.css %>",
                    "ext": ".css"
                }]
            }
        },
        "watch": {
            "style": {
                "tasks": ["sass:all"],
                "files": ["<%%= config.www.sass %>/**/*.scss"]
            }
        }
    });

    dev.push('sass:all');
    dev.push('watch:style');
    release.push('concat:all');
<% } else if ('vanilla' === preprocessor) { %>
    // This is the vanilla CSS task configuration.
    // This is untested, so please report any bug you encounter.
    grunt.extendConfig({
        "concat": {
            // concat framework files with main.css
            "all": {
                "files": [<% if ("foundation" === framework) { %>
                    "<%%= config.www.bower %>/foundation/css/normalize.css",
                    "<%%= config.www.bower %>/foundation/css/foundation.css",
                    "<%%= config.www.bower %>/foundation-icon-fonts/foundation-icons.css",<% } else if ("bootstrap" === framework) { %>
                    "<%%= config.www.bower %>/bootstrap/dist/css/bootstrap.css",<% } %>
                    "<%%= config.www.css %>/main.css"
                ]
            }
        },
        "watch": {
            "style": {
                "tasks": ["concat:all"],
                "files": ["<%%= config.www.css %>/**/*.css"]
            }
        }
    });
    dev.push('concat:all');
    dev.push('watch:style');
    release.push('concat:all');
<% } %>

    grunt.extendConfig({
        "cssmin": {
            "release": {
                "files": [{
                    "expand": true,
                    "cwd": "<%%= config.public.css %>",
                    "src": "**/*.css",
                    "dest": "<%%= config.public.css %>",
                    "ext": ".css"
                }]
            }
        }
    });
    release.push('cssmin:release');

    grunt.registerTask('style:dev', 'Build stylesheets continuously.', dev);
    grunt.registerTask('style:release', 'Build stylesheets for release.', release);
};
