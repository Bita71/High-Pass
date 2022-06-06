const gulp = require("gulp");

module.exports = function copyModules() {
  return gulp
    .src("src/local_modules/**/*")
    .pipe(gulp.dest(["build/local_modules"]));
};
