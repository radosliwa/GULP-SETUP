const gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssimport = require('gulp-cssimport'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css');

var currentProjectName = 'kill';

function addProjectSuffix() {
    return currentProjectName === 'default' ? '' : '-' + currentProjectName;
}
var paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcSCSS: 'src/styles/main.scss',
    srcCssVendors: 'src/styles/vendors/vendors.css',
    srcJS: 'src/js/main/*.js',
    srcJSVendors: 'src/js/vendors/*.js',

    temp: 'temp',
    tempHTML: 'temp/index.html',
    tempCSS: 'temp/styles',
    tempCssVendors: 'temp/styles/vendors',
    tempJS: 'temp/js/main',
    tempJSVendors: 'temp/js/vendors',
    // w kontekscie html w temp bedzie pobierał vendory juz przeniesione z src 
    vendorsNeeded: ['js/vendors/jquery.min.js', 'js/vendors/bootstrap.min.js'],

    dist: 'dist',
    distHTML: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
}

gulp.task('clean', function() {
    return del([paths.temp]);
});

gulp.task('html', function() {
    gulp.src(paths.srcHTML)
        .pipe(htmlreplace({
            'cssVendors': {
                src: 'styles/vendors/vendors' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'css': {
                src: 'styles/styles' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'js': {
                src: 'js/main/scripts' + addProjectSuffix() + '.js',
                tpl: '<script type="text/javascript" src="%s" defer></script>'
            },
            'jsVendors': paths.vendorsNeeded
        }))
        .pipe(gulp.dest(paths.temp));
});
gulp.task('css_vendors', function() {
    return gulp.src(paths.srcCssVendors)
        .pipe(cssimport())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(concatCss('vendors' + addProjectSuffix() + '.css'))
        .pipe(gulp.dest(paths.tempCssVendors));
});
gulp.task('css', function() {
    return gulp.src(paths.srcSCSS)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(cssimport())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename('styles' + addProjectSuffix() + '.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tempCSS));
});

gulp.task('js', function() {
    return gulp.src(paths.srcJS)
        .pipe(rename('scripts' + addProjectSuffix() + '.js'))
        .pipe(gulp.dest(paths.tempJS));
});

gulp.task('jsVendors', function() {
    return gulp.src(paths.srcJSVendors)
        .pipe(gulp.dest(paths.tempJSVendors));
});

gulp.task('copy', ['css_vendors', 'css', 'jsVendors', 'js', 'html']);

gulp.task('default', function() {
    runSequence('clean', 'copy')
});