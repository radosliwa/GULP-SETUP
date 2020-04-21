var gulp = require('gulp');
require('./paths');
require('./dev');
require('./watch');



// =======MAIN TASKS
gulp.task('vendors', gulp.parallel('css_vendors', 'jsVendors'));

gulp.task('styles', gulp.series('css'));
gulp.task('scripts', gulp.series('js'));

gulp.task('copy', gulp.parallel('styles', 'scripts', 'html'));
gulp.task('default', gulp.series('clean', gulp.parallel('css', 'js', 'html')));
gulp.task('default_full', gulp.series('cleanAll','vendors', 'copy'));

gulp.task('serve', gulp.series('default', 'watch'));
gulp.task('serve_full', gulp.series('default_full', 'watch'));