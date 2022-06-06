const gulp = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const rename = require("gulp-rename");

module.exports = function styles() {
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
    .src("src/styles/*.scss")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(sass())
    .pipe(
      gulpif(
        env === "prod",
        autoprefixer({
          cascade: false,
        })
      )
    )
    .pipe(gulpif(env === "prod", shorthand()))
    .pipe(
      gulpif(
        env === "prod",
        cleanCSS(
          {
            debug: true,
            compatibility: "*",
          },
          (details) => {
            console.log(
              `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
            );
          }
        )
      )
    )
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/css"));
};
