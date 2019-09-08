var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('watch',['default'], function(){

  browserSync.init({
    server:{
      baseDir:'temp'
    }
  });

  watch('./src/index.html',function(rel){
    gulp.start('html',function(){
        reload();
    });
  });

  watch('./src/styles/**/*.scss', function(){
    gulp.start('cssInject');
  });

  watch('./src/js/**/*.js', function(){
    gulp.start('scriptsRefresh');
  });
});


gulp.task('cssInject',['css'], function(){
    return gulp.src('./temp/styles/*.css')
    .pipe(browserSync.stream());
  });

gulp.task('scriptsRefresh',['jsVendors','js'], function(){
    browserSync.reload();
  });

gulp.task('htmlRefresh',['html'], function(){
    browserSync.reload();
  });

 function reload() {
    browserSync.reload();
};
  gulp.task('browser',['watch']);