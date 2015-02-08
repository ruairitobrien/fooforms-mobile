var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');

var paths = {
    sass: ['./scss/**/*.scss'], js: ['./www/js/**/*.js']
};

gulp.task('default', ['sass', 'concat-libs', 'compress']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('concat-libs', function (done) {
    gulp.src([
        'www/lib/lodash/lodash.js',
        'www/lib/ionic/js/ionic.js',
        'www/lib/angular/angular.js',
        'www/lib/angular-animate/angular-animate.js',
        'www/lib/angular-sanitize/angular-sanitize.js',
        'www/lib/angular-ui-router/release/angular-ui-router.js',
        'www/lib/angular-cookies/angular-cookies.js',
        'www/lib/angular-touch/angular-touch.js',
        'www/lib/ionic/js/ionic-angular.js',
        'www/lib/restangular/dist/restangular.js'

    ])
        .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('www/dist'))
        .on('end', done);
});

gulp.task('compress', function (done) {
    gulp.src('www/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/dist'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
