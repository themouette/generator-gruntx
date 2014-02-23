'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var prompts = require('../prompts');

var ModuleLoaderGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.log.info('I will generate frontend application module loading configuration for you.');
        this.npmPackages = [];
        this.bowerPackages = ['jquery'];
    },

    askForFrontFilesLocation: prompts.askFor('frontFilesLocation', prompts.frontFilesLocation),
    askForModuleLoader: prompts.askFor('moduleLoader', prompts.moduleLoader),

    requirejs: function () {
        if (this.moduleLoader !== 'requirejs') {
            return false;
        }
        // copy build file
        this.template('grunt/tasks/_app-requirejs.js', 'grunt/tasks/app.js');
        // copy initial configuration file
        this.template('requirejs/_config.js', this.frontFilesLocation + '/config.js');
        // copy kernel file.
        this.template('requirejs/_kernel.js', this.frontFilesLocation + '/kernel.js');

        this.npmPackages.push('grunt-contrib-clean');
        this.npmPackages.push('grunt-contrib-requirejs');
        this.npmPackages.push('grunt-contrib-watch');
        this.npmPackages.push('grunt-contrib-concat');

        this.bowerPackages.push('requirejs');
        this.bowerPackages.push('requirejs-text');
        this.bowerPackages.push('almond');
    },

    commonjs: function () {
        if (this.moduleLoader !== 'commonjs') {
            return false;
        }

        // copy build file
        this.template('grunt/tasks/_app-browserify.js', 'grunt/tasks/app.js');
        // copy kernel file.
        this.template('browserify/_kernel.js', this.frontFilesLocation + '/kernel.js');
        this.template('browserify/_config.js', this.frontFilesLocation + '/config.js');

        this.npmPackages.push('grunt-contrib-clean');
        this.npmPackages.push('grunt-browserify');
        this.npmPackages.push('grunt-contrib-watch');
    },

    es6: function () {
        if (this.moduleLoader !== 'es6') {
            return false;
        }
    },

    // In all cases, generated script is located under "/js/main.js".
    //
    // This step add a script tag to your `index.html`.
    insertScript: function () {
        // load index.html
        var indexFile = 'public/index.html';
        var script = '<script src="/js/main.js" type="text/javascript" charset="utf-8"></script>';
        var content;
        try {
            content = this.dest.read(indexFile);
        } catch (e) {
            this.log.info('No index.html found, please add stylesheet using the following:');
            this.log.info(script);
            return false;
        }
        // replace </head> with <link...></head>
        if (-1 !== content.indexOf(script)) {
            return false;
        }

        this.log.write();
        this.log.info('I am adding main JavaScript file to your index.html.');
        this.log.info('You should accept file overwriting.');
        this.log.write();
        var replaceRe = /(\s*)<\/body>/;
        content = content.replace(replaceRe, function (all, spaces) {
            return [
                spaces + '    ' + script,
                all
            ].join('\n');
        });
        this.dest.write(indexFile, content);
    },

    installNpmDeps: function () {
        var cb = this.async();
        // install dependencies
        this.npmInstall(this.npmPackages, {saveDev: true}, cb);
    },

    installBowerDeps: function () {
        var cb = this.async();
        // install dependencies
        this.bowerInstall(this.bowerPackages, {saveDev: true}, cb);
    }
});

module.exports = ModuleLoaderGenerator;
