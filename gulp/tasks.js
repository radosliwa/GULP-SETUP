var gulp = require('gulp');

// =======MAIN TASKS
gulp.task('vendors', gulp.parallel('css_vendors', 'jsVendors'));

gulp.task('styles', gulp.series('css_vendors', 'css'));
gulp.task('scripts', gulp.series('js'));

gulp.task('copy', gulp.parallel('styles', 'scripts', 'html'));
gulp.task('default', gulp.series('clean', gulp.parallel('css', 'js', 'html')));
gulp.task('default_full', gulp.series('cleanAll', 'copy'));

gulp.task('serve', gulp.series('default', 'watch'));
gulp.task('serve_full', gulp.series('default_full', 'watch'));