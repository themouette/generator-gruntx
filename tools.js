/* global module */
'use strict';

module.exports = {
    replaceFileSection: function replaceFileSection(generator, filePath, sectionTitle, newContent) {
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
};
