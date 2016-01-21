var gulp = require("gulp"),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
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
gulp.task('default', ['server', 'watch']);