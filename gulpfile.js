const gulp = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const minify = require("gulp-cssnano");
const open = require("gulp-open");
const os = require("os");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

let browser;

if ("linux" === os.platform()) {
    browser = "google-chrome";
} else if ("darwin" === os.platform()) {
    browser = "google-chrome";
} else if ("win-32" === os.platform()) {
    browser = "chrome";
} else {
    browser = "firefox";
}

gulp.task("text", () => {
    return gulp.src("./src/*.txt")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});

gulp.task("icons", () => {
    return gulp.src(["./src/*.png", "./src/*.ico"])
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});

gulp.task("fonts", () => {
    return gulp.src("./src/fonts/*.*")
        .pipe(gulp.dest("./dist/assets/fonts"))
        .pipe(connect.reload());
});

gulp.task("sass", () => {
    return gulp.src("./src/scss/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(minify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());
});

gulp.task("html", () => {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});

gulp.task("watch", () => {
    gulp.watch(["./src/fonts/*.*"], gulp.task("fonts"));
    gulp.watch(["./src/**/*.scss"], gulp.task("sass"));
    gulp.watch(["./src/*.txt"], gulp.task("text"));
    gulp.watch(["./src/*.png", "./src/*.ico"], gulp.task("icons"));
    gulp.watch(["./src/**/*.html"], gulp.task("html"));
});

gulp.task("serve", () => {
    const options = {
        uri: "http://localhost:3000",
        app: browser
    };

    connect.server({
        root: "dist",
        port: 3000,
        livereload: true
    });

    return gulp.src(__filename).pipe(open(options));
});

gulp.task("default", gulp.series("fonts", "sass", "text", "icons", "html", "serve", "watch", (done) => {
    done();
}));

