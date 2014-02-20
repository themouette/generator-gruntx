'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var prompts = require('../prompts');


var ServerGenerator = yeoman.generators.Base.extend({

    files: function () {
        this.copy('index.js', 'src/server/index.js');
        this.copy('index-dev.js', 'src/server/index-dev.js');
        this.copy('grunt/tasks/serve.js', 'grunt/tasks/serve.js');
    },

    installDevDeps: function () {
        var cb = this.async();
        // install dependencies
        this.npmInstall([
            'grunt-contrib-connect'
        ], {saveDev: true}, cb);
    },

    installDeps: function () {
        var cb = this.async();
        // install dependencies
        this.npmInstall([
            'express'
        ], {save: true}, cb);
    },
});

module.exports = ServerGenerator;
