const gulp = require('gulp'),
    del = require('del'),
    // STYLES==============
    autoprefixer = require('gulp-autoprefixer'),
    cssimport = require('gulp-cssimport'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    cssNano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    // SCRIPTS=============
    concatJs = require('gulp-concat'),
    webpack = require('webpack-stream'),
    {configVendors, config} = require('../webpack.config.js'),
    // HTML=============================
    htmlreplace = require('gulp-html-replace'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    { pathsDev, pathsBuild } = require('./paths'),
    paths = pathsDev;
var currentProjectName = 'kill';

let addProjectSuffix = function() {
    return currentProjectName === 'default' ? '' : currentProjectName;
}
gulp.task('clean', function() {
    return del([paths.temp, '!' + paths.temp + '/**/vendors']);
});
gulp.task('cleanAll', function() {
    return del([paths.temp]);
});
// ===========================STYLES

gulp.task('css_vendors', function() {
    return gulp.src(paths.srcCssVendors)
        .pipe(sourcemaps.init())
        .pipe(cssimport())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(concatCss('vendors-' + addProjectSuffix() + '.css'))
        .pipe(sourcemaps.write('.'))
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
        .pipe(cleanCSS())
        .pipe(rename('styles-' + addProjectSuffix() + '.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tempCSS));
});

// ===========================HTML 
gulp.task('html', function() {
    return gulp.src(paths.srcHTML)
        .pipe(htmlreplace({
            'cssVendors': {
                src: 'styles/vendors/vendors-' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'css': {
                src: 'styles/styles-' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'js': {
                src: 'js/main.js',
                tpl: '<script type="text/javascript" src="%s" defer></script>'
            },
            'jsVendors': 'js/vendors.js'
        }))
        .pipe(gulp.dest(paths.temp));
});

// ===========================SCRIPTS
gulp.task('jsVendors', function() {
    return gulp.src(paths.srcJSVendors)
    .pipe(webpack(configVendors, null, function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        if (stats.hasErrors()) {
            return new Error('STATS ERROR: ', stats.compilation.errors.join('\n'))
        }
        console.log('STATS: ', stats.toString());
    }))
    .pipe(gulp.dest(paths.tempJS));
});
gulp.task('js', function() {
    return gulp.src(paths.srcJS)
        .pipe(webpack(config, null, function(err, stats) {
            if (err) {
                console.log(err.toString());
            }
            if (stats.hasErrors()) {
                return new Error('STATS ERROR: ', stats.compilation.errors.join('\n'))
            }
            console.log('STATS: ', stats.toString());
        }))

    // .pipe(rename('scripts' + addProjectSuffix() + '.js'))
    .pipe(gulp.dest(paths.tempJS));
});