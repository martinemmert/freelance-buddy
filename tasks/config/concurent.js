module.exports = function (grunt) {

  grunt.config.set('concurrent', {
    watcher: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['watch:assets', 'watch:styles', 'watch:livereload']
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
};
