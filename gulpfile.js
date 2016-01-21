var gulp = require("gulp"),
  modernizr = require('gulp-modernizr');
    browserSync = require('browser-sync');

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});
gulp.task('modernizr', function() {
  gulp.src('app/js/*.js')
    .pipe(modernizr(
      {
        "options": [
        "setClasses",
        "html5shiv"
        ],
        "tests" : ['placeholder', 'cssanimations'],
        "uglify" : true,
      }
    ))
    .pipe(gulp.dest("app/js/venfor"))
});
 
gulp.task('prefix', function () {
   gulp.src('css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('prefix.css'))
    .pipe(gulp.dest('app/css/'));
});
// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

// Задача по-умолчанию
gulp.task('default', ['modernizr', 'server', 'watch']);