var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: 'temp'
        }
    });

    watch('./src/index.html', gulp.series('html', reload));

    watch('./src/styles/**/*.scss', gulp.series('styles', 'cssInject'));

    watch('./src/js/**/*.js', gulp.series('scripts', 'scriptsRefresh'));
});


gulp.task('cssInject', function() {
    return gulp.src('./temp/styles/*.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function() {
    browserSync.reload();
});

gulp.task('htmlRefresh', function() {
    browserSync.reload();
});

function reload() {
    browserSync.reload();
};