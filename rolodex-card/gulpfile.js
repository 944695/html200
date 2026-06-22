const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const gulpSass = require("gulp-sass")(require("sass"));

const paths = {
  styles: {
    src: "scss/style.scss",
    watch: "scss/**/*.scss",
    dest: "."
  },
  html: {
    watch: "*.html"
  }
};

function styles() {
  return src(paths.styles.src)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: "."
    },
    open: true,
    notify: false
  });

  done();
}

function watchFiles() {
  watch(paths.styles.watch, styles);
  watch(paths.html.watch).on("change", browserSync.reload);
}

exports.styles = styles;
exports.default = series(styles, serve, watchFiles);
