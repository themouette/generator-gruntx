/* global requirejs */
requirejs.config({
    baseUrl: '/js',
    paths: {
        'jquery': '<%%= vendors %>/jquery/dist/jquery',
        'text': '<%%= vendors %>/requirejs-text/text'
    }
});
