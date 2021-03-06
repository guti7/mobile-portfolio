var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache'),
    del         = require('del'),
    cssnano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify'),
    htmlmin     = require('gulp-htmlmin'),
    reload      = browserSync.reload;

var paths = {
  styles: {
    src: ['src/**/*.css'],
    dest: 'dist/'
  },
  scripts: {
    src: ['src/**/*.js'],
    dest: 'dist/'
  },
  html: {
    src: ['src/**/*.html'],
    dest: 'dist/'
  },
  images: {
    src: ['src/**/*.{jpg,png,gif}'],
    dest: 'dist/'
  }
}

gulp.task('watch', function() {
  gulp.watch(paths.styles.src, gulp.series('styles'));
  gulp.watch(paths.scripts.src, gulp.series('scripts'));
  gulp.watch(paths.html.src, gulp.series('minify'));
  gulp.watch(paths.images.src, gulp.series('imagemin'));
});

gulp.task('minify', function() {
  return gulp.src(paths.html.src)
         .pipe(htmlmin({collapseWhitespace : true}))
         .pipe(gulp.dest(paths.html.dest))
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts.src)
         .pipe(uglify())
         .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles.src)
         .pipe(cssnano())
         .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('clean', function() {
  return del(['dist/*', '!dist/']);
});

gulp.task('clear', function() {
  return cache.clearAll()
});

gulp.task('imagemin', function() {
  return gulp.src(paths.images.src)
        .pipe(cache(imagemin([
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.jpegtran({ progressive: true })
        ])))
        .pipe(gulp.dest(paths.images.dest));
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    browser: "google chrome"
  })
  gulp.watch(['index.html', 'css/**/*.css', 'js/**/*.js', 'images/**/*']);  // {cwd: './'}
});

gulp.task('default', defaultTask());

function defaultTask() {
  return gulp.series('clean', 'clear', gulp.parallel('scripts', 'styles', 'imagemin', 'minify', 'watch'));
}
