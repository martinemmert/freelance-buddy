module.exports = function (grunt) {

  var loadPaths    = [],
      bourbonPaths = require('bourbon').includePaths;

  loadPaths = loadPaths.concat(bourbonPaths);

  grunt.config.set('sass', {
    options: {
      includePaths: loadPaths,
      sourceMap: true
    },
    dev: {
      options: {
        lineNumbers: true,
        outputStyle: "expanded"
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['importer.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};
