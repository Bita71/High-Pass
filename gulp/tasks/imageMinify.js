const gulp = require("gulp");
const gulpif = require("gulp-if");
const imagemin = require("gulp-imagemin");

module.exports = function imageMinify() {
  const env = process.env.NODE_ENV;

  return gulp
    .src("src/img/**/*.{gif,png,jpg,svg,webp}")
    .pipe(
      gulpif(
        env === "prod",
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({
            quality: 75,
            progressive: true,
          }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(gulp.dest("build/img"));
};
