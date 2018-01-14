var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./src/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src'));
});

gulp.task('scss', function() {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/**/*.sass', ['sass']);
});

gulp.task('scss:watch', function() {
    gulp.watch('src/**/*.scss', ['scss']);
});
