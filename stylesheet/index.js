'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var prompts = require('../prompts');
var browserify = require('../module-loader/browserify');
var requirejs = require('../module-loader/requirejs');

var StylesheetGenerator = yeoman.generators.Base.extend({

    askForPreprocessor: prompts.askFor('preprocessor', prompts.cssPreprocessor),
    askForFramework: prompts.askFor('framework', prompts.cssFramework, 'preprocessor'),
    askForModuleLoader: prompts.askFor('moduleLoader', prompts.moduleLoader),
    askForFrontFilesLocation: prompts.askFor('frontFilesLocation', prompts.frontFilesLocation),

    grunt: function () {
        this.template('grunt/tasks/_style.js', 'grunt/tasks/style.js');
    },

    foundationSass: function () {
        if ('sass' !== this.preprocessor || 'foundation' !== this.framework) {
            return false;
        }

        this.copy('sass/foundation.scss', 'sass/main.scss');
    },

    foundationJs: function () {
        // configure module loader to include foundation
        if ('foundation' !== this.framework) {
            return false;
        }
        var modulename = 'foundation';
        switch (this.moduleLoader) {
            case 'requirejs':
                requirejs.mergeConfigFile(this, modulename, 'foundation/requirejs.config.js');
                requirejs.addKernelFile(this, modulename, 'foundation/requirejs.foundation.js');
                break;
            case 'commonjs':
                browserify.mergeConfigFile(this, modulename, 'foundation/browserify.config.js');
                browserify.addKernelFile(this, modulename, 'foundation/browserify.foundation.js');
                break;
            case 'es6':
            default:
                console.log('I do not know how to integrate Foundation with "' + this.moduleLoader + '" module loader');
        }
    },

    bootstrapSass: function () {
        if ('sass' !== this.preprocessor || 'bootstrap' !== this.framework) {
            return false;
        }

        this.copy('sass/bootstrap.scss', 'sass/main.scss');
    },

    bootstrapJs: function () {
        // configure module loader to include foundation
        if ('bootstrap' !== this.framework) {
            return false;
        }
        var modulename = 'bootstrap';
        switch (this.moduleLoader) {
            case 'requirejs':
                requirejs.mergeConfigFile(this, modulename, 'bootstrap/requirejs.config.js');
                requirejs.addKernelFile(this, modulename, 'bootstrap/requirejs.bootstrap.js');
                break;
            case 'commonjs':
                browserify.mergeConfigFile(this, modulename, 'bootstrap/browserify.config.js');
                browserify.addKernelFile(this, modulename, 'bootstrap/browserify.bootstrap.js');
                break;
            case 'es6':
            default:
                console.log('I do not know how to integrate Foundation with "' + this.moduleLoader + '" module loader');
        }
    },

    bourbon: function () {
        if ('bourbon' !== this.framework) {
            return false;
        }
        if ('sass' !== this.preprocessor) {
            var cb = this.async();
            var err = new Error('You must use sass preprocessor with Bourbon.');
            return cb(err);
        }

        this.copy('sass/bourbon.scss', 'sass/main.scss');
    },

    vanilla: function () {
        if ('vanilla' !== this.preprocessor) {
            return false;
        }

        this.copy('css/main.css', 'assets/css/main.css', {path: 'assets/css/main.css'});
    },

    insertStylesheet: function () {
        // load index.html
        var indexFile = 'public/index.html';
        var link = '<link rel="stylesheet" href="/css/main.css" type="text/css" media="screen" title="main file" charset="utf-8">';
        var content;
        try {
            content = this.dest.read(indexFile);
        } catch (e) {
            console.info([
                '',
                '> No index.html found, please add stylesheet using the following:',
                '> ' + link,
                ''
            ].join('\n'));
            return false;
        }
        // replace </head> with <link...></head>
        if (-1 !== content.indexOf(link)) {
            return false;
        }

        console.info([
            '',
            '> I am adding main stylesheet to your index.html.',
            '> You should accept file overwriting.',
            ''
        ].join('\n'));
        var replaceRe = /(\s*)<\/head>/;
        content = content.replace(replaceRe, function (all, spaces) {
            return [
                spaces + '    ' + link,
                all
            ].join('\n');
        });
        this.dest.write(indexFile, content);
    },

    npm: function () {
        var packages = [];

        switch (this.preprocessor) {
            case 'sass':
                packages.push('grunt-sass');
                break;
            case 'vanilla':
                packages.push('grunt-contrib-concat');
                break;
        }
        switch (this.framework) {
            case 'foundation':
                break;
            case 'bourbon':
                packages.push('node-bourbon');
                break;
            case 'bootstrap':
                break;
        }

        packages.push('grunt-contrib-cssmin');
        packages.push('grunt-contrib-copy');
        packages.push('grunt-contrib-clean');
        packages.push('grunt-contrib-watch');

        this.npmInstall(packages, {saveDev: true}, this.async());
    },

    bower: function () {
        var packages = [];

        switch (this.framework) {
            case 'foundation':
                packages.push('foundation');
                packages.push('zurb/foundation-icon-fonts');
                break;
            case 'bourbon':
                break;
            case 'bootstrap':
                if ('sass' === this.preprocessor) {
                    packages.push('bootstrap-sass-official');
                } else {
                    packages.push('bootstrap');
                }
                break;
        }

        this.bowerInstall(packages, {saveDev: true}, this.async());
    }
});

module.exports = StylesheetGenerator;

