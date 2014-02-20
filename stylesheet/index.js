'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var prompts = require('../prompts');

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
        var foundationConfig;
        switch (this.moduleLoader) {
            case 'requirejs':
                foundationConfig = this.engine(this.read('foundation/require.config.js'));
                replaceRjsConfigSection(this, 'Zurb Foundation configuration', foundationConfig);
                this.copy('foundation/require.foundation.js', this.frontFilesLocation + '/foundation.js');
                break;
            case 'commonjs':
                foundationConfig = this.engine(this.read('foundation/browserify.foundation.js'));
                replaceCommonJsKernelSection(this, 'Zurb Foundation configuration', foundationConfig);
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
        var bootstrapConfig;
        switch (this.moduleLoader) {
            case 'requirejs':
                bootstrapConfig = this.engine(this.read('bootstrap/require.config.js'));
                replaceRjsConfigSection(this, 'Twitter Bootstrap configuration', bootstrapConfig);
                this.copy('bootstrap/requirejs.bootstrap.js', this.frontFilesLocation + '/bootstrap.js');
                break;
            case 'commonjs':
                bootstrapConfig = this.engine(this.read('bootstrap/browserify.bootstrap.js'));
                replaceCommonJsKernelSection(this, 'Twitter Bootstrap configuration', bootstrapConfig);
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

function replaceRjsConfigSection(generator, sectionTitle, newContent) {
    var configPath = generator.frontFilesLocation + '/config.js';

    return replaceFileSection(generator, configPath, sectionTitle, newContent);
}

function replaceCommonJsKernelSection(generator, sectionTitle, newContent) {
    var configPath = generator.frontFilesLocation + '/kernel.js';

    return replaceFileSection(generator, configPath, sectionTitle, newContent);
}

function replaceFileSection(generator, filePath, sectionTitle, newContent) {
    var start = '// {{{ ' + sectionTitle;
    var end = '// ' + sectionTitle + ' }}}';
    var re = new RegExp(start + '\n(.|\n)*\n' + end, 'mg');

    // load content
    var content;
    try {
        content = generator.dest.read(filePath);
    } catch (e) {
        content = '';
    }

    newContent = [start, newContent, end].join('\n');

    if (re.test(content)) {
        content = content.replace(re, newContent);
    } else {
        content = [content, newContent].join('\n');
    }

    console.info([
        '',
        '> I am adding ' + sectionTitle + ' to your requirejs config file.',
        '> You should accept file overwriting.',
        ''
    ].join('\n'));
    generator.dest.write(filePath, content);
}
