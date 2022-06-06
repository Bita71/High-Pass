const gulp = require("gulp");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const rigger = require("gulp-rigger");

const sourcemaps = require("gulp-sourcemaps");

module.exports = function script() {
  const env = process.env.NODE_ENV;

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
    .src("src/js/*.js")
    .pipe(rigger())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify().on("error", notify.onError())))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/js"));
};
