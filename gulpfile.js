var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    reload      = browserSync.reload;

gulp.task('clean', function(){
  return del(['build/dist/images/']);
});

gulp.task('imagemin', function() {
  return gulp.src(['img/**/*', 'views/images/**/*']) // 'views/images/**/*.{png, jpg}'
        .pipe(imagemin([
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest('build/dist/images'))
});

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
