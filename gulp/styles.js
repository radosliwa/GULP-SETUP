const gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssimport = require('gulp-cssimport'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    cssNano = require('gulp-cssnano');

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

gulp.task('styles', gulp.series('css_vendors', 'css'));