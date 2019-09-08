
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssimport = require('gulp-cssimport');
// var htmlreplace = require('gulp-html-replace');
// var browserSync = require('browser-sync').create();
var concatCss = require('gulp-concat-css');

var currentProjectName = 'kill';
function addProjectSuffix() {
    return currentProjectName === 'default' ? '' : '-' + currentProjectName;
}
var paths={
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcSCSS: 'src/styles/main.scss',
    srcJS: 'src/js/main/*.js',
    srcJSVendors: 'src/js/vendors/*.js',

    temp: 'temp',
    tempHTML: 'temp/index.html',
    tempCSS: 'temp/styles',
    tempJS: 'temp/js/main',
    tempJSVendors: 'temp/js/vendors',
    // w kontekscie html w temp bedzie pobierał vendory juz przeniesione z src 
    vendorsNeeded :['js/vendors/jquery.min.js'],

    dist: 'dist',
    distHTML: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
}

gulp.task('clean', function () {
    return del([paths.temp]);
  });

gulp.task('html', function () {
    // return gulp.src(paths.srcHTML)
    // .pipe(gulp.dest(paths.temp));

    gulp.src(paths.srcHTML)
    .pipe(htmlreplace({
        'css': {
            src: 'styles/styles' + addProjectSuffix() + '.css',
            tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
        }
        ,
        'js': {
            src: 'js/main/scripts' + addProjectSuffix() + '.js',
            tpl: '<script type="text/javascript" src="%s" defer></script>'
        },
        'jsVendors': paths.vendorsNeeded
    }))
    .pipe(gulp.dest(paths.temp));
  });

gulp.task('css', function () {
    
    return gulp.src(paths.srcSCSS)
    .pipe(sourcemaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('styles' + addProjectSuffix() + '.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.tempCSS));
  });

  gulp.task('js', function () {
    return gulp.src(paths.srcJS)
    .pipe(rename('scripts' + addProjectSuffix() + '.js'))
    .pipe(gulp.dest(paths.tempJS));
  });

  gulp.task('jsVendors', function () {
    return gulp.src(paths.srcJSVendors)
    .pipe(gulp.dest(paths.tempJSVendors));
  });

gulp.task('copy', ['css','jsVendors', 'js','html']);



gulp.task('default',function(){
    runSequence('clean','copy')
});

  
  