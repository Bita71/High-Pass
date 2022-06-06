const gulp = require("gulp");
const svgstore = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");

module.exports = function svgSprite() {
  return gulp
    .src("src/img/**/*.svg")
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgstore({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("build/img"));
};
