/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

  grunt.config.set('watch', {
    assets: {

      // Assets to watch:
      files: ['assets/**/*.!(sass|css|less)', 'tasks/pipeline.js', '!**/node_modules/**'],

      // When assets are changed:
      tasks: ['syncAssets', 'linkAssets']
    },
    styles: {
      files: ['assets/styles/**/*'],
      tasks: ['sass:dev']
    },
    livereload: {
      files: ['.tmp/public/styles/**/*.css'],
      options: {
        livereload: true,
        event: ['changed']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
