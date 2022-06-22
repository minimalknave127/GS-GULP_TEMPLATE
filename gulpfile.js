const { src, watch, task, dest, series } = require("gulp");
const browserSync = require("browser-sync");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const imagewebp = require("gulp-webp");
const fileInclude = require("gulp-file-include");
const prefix = require("gulp-autoprefixer");

// convert SCSS to CSS
function compileScss() {
  return src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(prefix({}))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
}

// Uglify(minify) JS
function compileJs() {
  return src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(dest("./dist/js/"))
    .pipe(browserSync.stream());
}

// Optimize images
function optimizeImg() {
  return src("src/assets/compress/*.{jpg,png,svg,gif}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.svgo(),
      ])
    )
    .pipe(dest("dist/assets/compress"));
}

// Move all assets other assets to dist folder

function moveAssets() {
  return src("src/assets/*.*").pipe(dest("dist/assets"));
}

// Convert optimized images to .webp
function webpImage() {
  return src("dist/assets/compress/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/assets/compress"));
}

// Import components to files (header, footer, etc.)
function includeFiles() {
  return src("src/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src/components",
        filters: {
          name: "index.html",
        },
      })
    )
    .pipe(dest("dist"));
}

// Serve website and update on changes
function watchTaskAndServe() {
  browserSync.init({
    open: false,
    server: "dist",
    notify: false,
  });
  watch("src/scss/**/*.scss", compileScss);
  watch("src/js/**/*.js", compileJs);
  watch("src/assets/**/*.{jpg,png,svg,gif}", optimizeImg);
  watch("dist/assets/**/*.{jpg,png}", webpImage);
  watch("src/**/*.html", includeFiles);
  watch("src/*.html").on("change", browserSync.reload);
}

// command to serve without compiling - $ gulp serve

task("serve", watchTaskAndServe);

// Default actions for gulp command

exports.default = series(
  compileScss,
  compileJs,
  moveAssets,
  optimizeImg,
  webpImage,
  includeFiles,
  watchTaskAndServe
);
