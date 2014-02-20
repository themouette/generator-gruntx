'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var prompts = require('../prompts');

var GruntGenerator = yeoman.generators.Base.extend({

    askForFrontFilesLocation: prompts.askFor('frontFilesLocation', prompts.frontFilesLocation),

    files: function () {
        // Copy `Gruntfile.js` and basic stuff for grunt-extend
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.mkdir('grunt');
        this.mkdir('grunt/tasks');
        this.mkdir('grunt/plugins');
        this.copy('grunt/plugins/extendConfig.js', 'grunt/plugins/extendConfig.js');
        // Build configuration.
        this.template('grunt/_config.json', 'grunt/config.json');

        // Add json configuration capabilities
        this.copy('grunt/tasks/options.js', 'grunt/tasks/options.js');
        this.mkdir('grunt/options');
        // this is required for the dev task.
        this.copy('grunt/options/concurrent.json', 'grunt/options/concurrent.json');

        // add doc task to generate doc.
        this.copy('grunt/tasks/doc.js', 'grunt/tasks/doc.js');
        this.copy('grunt/tasks/bump.js', 'grunt/tasks/bump.js');

    },

    installDeps: function () {
        var cb = this.async();
        // install dependencies
        this.npmInstall([
            'lodash',
            'grunt-cli',
            'grunt',
            'load-grunt-tasks',
            'grunt-concurrent'
        ], {saveDev: true}, cb);
    },

    moduleLoading: function () {
        if (this.moduleLoader === 'requirejs') {
            moduleLoading(this, 'requirejs', this.async());
        } else {
            moduleLoading(this, 'none', this.async());
        }
    },

    templateEngine: function () {
        templateEngine(this, this.options.templateEngine, this.async());
    }
});

function moduleLoading(generator, strategy, cb) {
    strategy || (strategy = 'requirejs');
    switch (strategy) {
        case 'requirejs':
            generator.copy('grunt/tasks/app-requirejs.js', 'grunt/tasks/app.js');
            generator.bowerInstall(['requirejs', 'requirejs-text'], { save: true }, cb);
            break;
        case 'none':
            generator.log('No module loading.');
            if (cb) cb();
            break;
        default:
            stop('Unknown module loading strategy "' + strategy + '"', cb);
    }
}

function templateEngine(generator, strategy, cb) {
    strategy || (strategy = 'handlebars');
    switch (strategy) {
        case 'handlebars':
            generator.copy('grunt/tasks/templates-hbs.js', 'grunt/tasks/templates.js');
            generator.bowerInstall(['handlebars'], { save: true }, function () {
                generator.npmInstall(['grunt-contrib-handlebars'], {saveDev: true}, cb);
            });
            break;
        case 'underscore':
            generator.bowerInstall(['lodash'], { save: true }, cb);
            break;
        case 'none':
            generator.log('No template engine.');
            if (cb) cb();
            break;
        default:
            stop('Unknown template engine strategy "' + strategy + '"', cb);
    }
}

function stop(message, cb) {
    var e = new Error(message);
    generator.emit('error', e);
    if (cb) return cb(e);
    throw e;
}

module.exports = GruntGenerator;
