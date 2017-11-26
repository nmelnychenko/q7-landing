var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var sourceMaps   = require('gulp-sourcemaps');
var server       = require('gulp-server-livereload');
var cache        = require('gulp-cache');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var babel        = require('gulp-babel-compile');
var include      = require("gulp-include");
var fileinclude  = require('gulp-file-include');

var PAGE = 'etron';

gulp.task('scripts', function () {
    return gulp.src(`src/js/**`)
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('pdf', function () {
   return gulp.src(`src/pdf/**/*`)
       .pipe(gulp.dest('dist/pdf/'));
});

gulp.task('sass', function () {
    return gulp.src(`src/scss/components/main-page.scss`)
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename('main-page.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('pages', function() {
    gulp.src([`src/**.html`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function(){
    return gulp.src('src/scss/theme/fonts/**/*')
        .pipe(gulp.dest('dist/css/fonts/'))
});

gulp.task('images', function() {
    gulp.src('src/scss/images/**/*')
        .pipe(gulp.dest('dist/css/images/'))
});

gulp.task('videos', function() {
    gulp.src('src/videos/**/*')
        .pipe(gulp.dest('dist/videos/'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
    .pipe(server({
        livereload: {
            enable: true,
            filter: function(filePath, cb) {
                cb( !(/.DS_Store/.test(filePath)) );
            }
        },
        directoryListing: false,
        open: true,
        log: 'info',
        defaultFile: `index.html`//,
        //host: '0.0.0.0'
    }));
});

gulp.task('default', function() {
    gulp.start('images', 'videos', 'pdf', 'scripts', 'fonts', 'sass', 'pages', 'webserver');
    gulp.watch('src/scss/theme/*.scss', ['sass']);
    gulp.watch('src/scss/components/**/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/images/*', ['images']);
    gulp.watch('src/**/**/*.html', ['pages']);
    gulp.watch('src/scss/theme/fonts/**/*', ['fonts']);
});