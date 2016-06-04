var gulp = require("gulp");
var concat = require("gulp-concat");


gulp.task("default", ["build", "watch"]);

gulp.task("watch", function () {
    gulp.watch('./src/**/*.js', ["build"]);
});

gulp.task("build", function () {
    gulp.src(
        [
            "./src/core/shipio.js"
        ])
        .pipe(concat("shipio.js"))
        .pipe(gulp.dest('./build/'));
});