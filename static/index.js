// ## Generate static content
//
// Generate a static website using [wintersmith](http://wintersmith.io/).
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');


var StaticGenerator = yeoman.generators.Base.extend({
    init: function () {
        console.log('You called the static subgenerator with the argument ' + this.name + '.');
        this.staticSiteDir = 'content';
        this.wintersmithPlugins = [];
        this.wintersmithConfig = {};
    },

    gruntExtension: function () {
        this.copy('grunt/tasks/static.js', 'grunt/tasks/static.js');
    },

    installWintersmith: function () {
        // install wintersmith
        var packages = ['wintersmith', 'wintersmith-handlebars'];
        this.npmInstall(packages, {saveDev: true}, this.async());
    },

    askForScaffold: function () {
        var cb = this.async();
        this.prompt([{
                type: 'list',
                name: 'wintersmithTemplate',
                message: 'Would you like to scaffold from template?',
                choices: [{
                    name: 'Basic',
                    value: 'basic',
                    checked: true
                }, {
                    name: 'Blog',
                    value: 'blog'
                }, {
                    name: 'Webapp',
                    value: 'webapp'
                }, {
                    name: 'None',
                    value: 'none'
                }]
            }], function (props) {
                this.wintersmithTemplate = props.wintersmithTemplate;
                cb();
            }.bind(this));
    },

    scaffoldWebsite: function () {
        if (this.wintersmithTemplate === 'none') {
            // we're done
            return false;
        }
        var cb = this.async();
        var cmd = './node_modules/.bin/wintersmith';
        var args = [
            'new',
            // destination directory
            this.staticSiteDir,
            // template arguments
            '--template', this.wintersmithTemplate
        ];

        this.spawnCommand(cmd, args, cb)
            .on('error', cb)
            .on('exit', this.emit.bind(this, 'wintersmith:end'))
            .on('exit', function (err) {
                if (err === 127) {
                    this.log.error('Could not find ' + cmd + '. Please install with `npm install -g ' + cmd + '.');
                }
                cb(err);
            }.bind(this));
    },

    addWintersmithHandlebars: function () {

        this.wintersmithConfig.handlebars = {
            'partialDir': 'partials',
            'helperDir': 'helpers'
        };

        this.wintersmithPlugins.push('../node_modules/wintersmith-handlebars/wintersmith-handlebars.coffee');
        this.copy('content/templates/layout.hbs', 'content/templates/layout.hbs');
        this.copy('content/templates/index.hbs', 'content/templates/index.hbs');
        this.copy('content/templates/partials/header.hbs', 'content/templates/partials/header.hbs');
        this.copy('content/templates/partials/footer.hbs', 'content/templates/partials/footer.hbs');

    },

    addWintersmithPlugins: function () {
        var config;
        try {
            config = this.dest.read(path.resolve(this.staticSiteDir, 'config.json'));
        } catch (e) {
            console.log(e);
            this.log.skip('unable to read wintersmith config');
            return false;
        }
        config = JSON.parse(config);
        config.plugins || (config.plugins = []);

        _.defaults(config, this.wintersmithConfig);
        config.plugins = config.plugins.concat(this.wintersmithPlugins);

        // plugins array should only comport unique values
        config.plugins = config.plugins.filter(function uniq(value, index, self) {
            return self.indexOf(value) === index;
        });


        this.log.info('I am about to install wintersmiths plugins.');
        this.log.info('Please accept change.');
        this.dest.write(path.resolve(this.staticSiteDir, 'config.json'), JSON.stringify(config, null, 4));
    }
});

module.exports = StaticGenerator;
