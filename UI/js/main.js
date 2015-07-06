// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  shim: {
        underscore: {
          exports: '_'
        },
        Backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        },
        bootstrap:{
            deps:["jquery"],
			exports: "$.fn.tooltip"
        }
    },
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
	bootstrap: 'libs/bootstrap/js/bootstrap.min',
    templates: '../templates',
	quill: 'libs/quill/quill.min'
  }

});
require(['jquery', 'backbone', 'app'], function ($, Backbone, app) {
    app.initialize();
});

