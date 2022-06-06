const gulp = require("gulp");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const pugLinter = require("gulp-pug-linter");

module.exports = function pug2html() {
  var errorFree = true;

  var onError = function (err) {
    errorFree = false;

    var subtitle = "Error";
    var message = err.message;

    notify.onError({
      title: "Gulp",
      subtitle: subtitle,
      message: message,
      sound: false,
    })(err);

    this.emit("end");
  };
  return gulp
    .src("src/pages/*.pug")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(pugLinter({ reporter: "default" }))
    .pipe(
      pug({
        pretty: {
          beautifyHtml: false,
        },
      })
    )
    .pipe(gulp.dest("build"));
};
