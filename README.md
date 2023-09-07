## gulpを導入するプロジェクトでの初期設定
### ターミナルで実行する
```
npm init -y;npm install -D gulp;npm install -D gulp-pug gulp-rename pug-php-filter gulp-webp gulp-imagemin@7 gulp-plumber gulp-notify gulp-uglify sass gulp-sass gulp-sass-glob-use-forward gulp-postcss gulp-autoprefixer
```

### 注意
- `gulp-imagemin`は7系だとエラーが出るので、`gulp-imagemin@7`としている。
- `gulp-postcss`は`gulp-autoprefixer`を使うためにインストールしているが、`gulpfile.js`の中では使っていない
