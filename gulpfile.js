
var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files');

gulp.task('default', function() {
    return gulp.src(mainBowerFiles())
           .pipe(gulp.dest('www/js/vendor'));
});

