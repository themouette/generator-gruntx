# generator-grunt eXtend [![Build Status](https://secure.travis-ci.org/themouette/generator-gruntx.png?branch=master)](https://travis-ci.org/themouette/generator-gruntx)

A generator for [Yeoman](http://yeoman.io).

My personal webapp generator, bundled with split grunt build.

Choose any module loader:

* requirejs
* browserify
* none

Choose your CSS framework:

* Zurb Foundation 5
* Twitter Bootstrap (issue with libsass)
* bourbon
* none

Choose your CSS preprocessor:

* sass
* none

Generate static content using

* [wintersmith](http://wintersmith.io) and Handlebars or jade.

Coming soon:

* tests with mocha, casperjs and Browserstack or Saucelabs.
* template engine (handlebars)
* bump and deploy scripts

Coming later:

* Add a tranpiler


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-gruntx from npm, run:

```
$ npm install -g generator-gruntx
```

Finally, initiate the generator:

```
$ mkdir myProject & cd $_
$ yo gruntx
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
