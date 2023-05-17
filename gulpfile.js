const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const pugPHPFilter = require('pug-php-filter');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const plumber = require("gulp-plumber");
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob-use-forward");
const autoprefixer = require("gulp-autoprefixer"); // これはまだ未実装

// pugをphpに変換する
const compilePug = () => {
  return src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
    .pipe(pug({
      pretty: true,
      filters: {
        php: pugPHPFilter
      }
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(dest('./'));
}

// jpg,jpeg,pngをwebpに変換して圧縮する
const minifyImg = () => {
  return src('src/img/*.{jpg,jpeg,png}')
    .pipe(webp({
      quality: 70,
      method: 6,
    }))
    .pipe(dest('assets/img'));
}

// svgを圧縮する
const minifySvg = () => {
  return src('src/img/*.svg')
    .pipe(imagemin())
    .pipe(dest('assets/img'));
}

// jsを圧縮する
const minifyJs = () => {
  return src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest('assets/js'));
}

// scssを変換する
const compileSass = () => {
  return src('src/scss/*.scss')
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(sassGlob())
    .pipe(sass.sync({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest('assets/css'));
}

exports.compileSass = compileSass;
exports.compilePug = compilePug;
exports.minifyImg = minifyImg;
exports.minifySvg = minifySvg;
exports.minifyJs = minifyJs;

exports.watch = () => {
  watch('src/img/*.{jpg,jpeg,png}', minifyImg);
  watch('src/img/*.svg', minifySvg);
  watch(['src/pug/**/*.pug', '!src/pug/**/_*.pug'], compilePug);
  watch('src/js/*.js', minifyJs);
  watch('src/scss/*.scss', compileSass);
}
