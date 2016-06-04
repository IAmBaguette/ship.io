var gulp = require("gulp");
var concat = require("gulp-concat");


gulp.task("default", ["watch"]);

gulp.task("watch", function () {
    gulp.watch('./src/**/*.js', ["build"]);
});

gulp.task("build", function () {
    return gulp.src(
        [
            "./src/core/shipio.js"
        ])
        .pipe(concat("shipio.js"))
        .pipe(gulp.dest('./build/'));
});