/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and the ! prefix for excluding files.)
 */

// Path to public folder
var tmpPath = '.tmp/public/';

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  // Load sails.io before everything else
  //'js/dependencies/sails.io.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/lodash/lodash.js',
  'bower_components/js-signals/dist/signals.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-messages/angular-messages.js',
  'bower_components/angular-resource/angular-resource.js',
  'js/extensions/me-angular-classes/me-angular-classes.module.js',
  'js/extensions/me-angular-classes/class.provider.js',
  'js/extensions/me-angular-models/me-angular-models.module.js',
  'js/extensions/me-angular-models/model.provider.js',
  'js/extensions/me-angular-models/collection.provider.js',
  'js/extensions/me-angular-models/model-relation-builder.factory.js',
  'js/extensions/me-angular-models/classes/*.js',
  'js/app/**/!(app).module.js',                                             // import all module definitions
  'js/app/**/!(app).module.config.js',                                      // import all provider configs
  'js/app/**/!(app).module.run.js',                                         // import all runtime configs
  'js/app/**/!(app).class!(\.spec|\.run|\.config).js',                      // import all custom classes
  'js/app/**/!(app).@(directive|factory|service|controller|provider|helper|model|collection).js',   // import all providers
  // import the application root module
  'js/app/app.module.js',
  'js/app/app.module.config.js',
  'js/app/app.module.run.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(transformPath);
module.exports.jsFilesToInject = jsFilesToInject.map(transformPath);
module.exports.templateFilesToInject = templateFilesToInject.map(transformPath);

// Transform paths relative to the "assets" folder to be relative to the public
// folder, preserving "exclude" operators.
function transformPath(path) {
  return (path.substring(0, 1) == '!') ? ('!' + tmpPath + path.substring(1)) : (tmpPath + path);
}
