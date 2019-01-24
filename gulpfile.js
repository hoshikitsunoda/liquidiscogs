const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('app/scss/**/*.scss', gulp.series('browserSync'));
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})