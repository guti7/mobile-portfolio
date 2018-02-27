var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache'),
    del         = require('del'),
    cssnano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify'),
    reload      = browserSync.reload;


gulp.task('scripts', function() {
  return gulp.src(['js/*'])
         .pipe(uglify())
         .pipe(gulp.dest('build/dist/scripts'));
});

gulp.task('styles', function() {
  return gulp.src(['css/**/*.css'])
         .pipe(cssnano())
         .pipe(gulp.dest('build/dist/styles/'));
});

gulp.task('clean', function() {
  return del(['build/dist/*', '!build/dist/']);
});

gulp.task('clear', function() {
  return cache.clearAll()
});

gulp.task('imagemin', function() {
  return gulp.src(['img/**/*', 'views/images/**/*']) // 'views/images/**/*.{png, jpg}'
        .pipe(cache(imagemin([
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.jpegtran({ progressive: true })
        ])))
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

gulp.task('default', defaultTask());

function defaultTask() {
  return gulp.series('clean', gulp.parallel('scripts', 'styles', 'imagemin', 'serve'));
}
