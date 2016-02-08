var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    wiredep = require('wiredep').stream,
    prefix = require('gulp-autoprefixer'),
    rimraf = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    minifyCss = require('gulp-minify-css');

// Следим за bower
gulp.task('wiredep', function() {
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app/'))
});

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('prefix', function() {
  gulp.src('app/css/*.css')
    .pipe(prefix('last 15 versions', '> 1%'))
    .pipe(gulp.dest('app/css/prefix'))
});
// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);

// СБОРКА
// Переносим HTML CSS JS в папку dist
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({compability: 'ie8'})))
    .pipe(gulp.dest('dist'));
});

// Очистка
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
  .pipe(rimraf());
});

// Перенос шрифтов
gulp.task('fonts', function() {
  gulp.src('app/font/*')
    .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff2', '*.woff']))
    .pipe(gulp.dest('dist/font/'));
});

// Картинки
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

// Остальные файлы
gulp.task('extras', function() {
  return gulp.src(['app/images/*.*'])
    .pipe(gulp.dest('dist/images'));
});

// Собираем папку DIST
gulp.task('build', ['clean'], function() {
    gulp.start('dist');
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist',  ['useref', 'images', 'fonts', 'extras'], function() {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});