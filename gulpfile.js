var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;


// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    browser: "google chrome"
  })
  gulp.watch(['index.html', 'css/**/*.css', 'js/**/*.js'], {cwd: './'}, reload);
});

gulp.task('default', defaultTask);

function defaultTask(done) {
  // Perform something
  done();
}
