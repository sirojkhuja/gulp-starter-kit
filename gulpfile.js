const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const obfuscate = require('gulp-javascript-obfuscator')
const sourceMap = require('gulp-sourcemaps')
const babel = require('gulp-babel')


function js(cb) {
    src('src/*.js')
        .pipe(sourceMap.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(obfuscate({
            compact: true
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourceMap.write())
        .pipe(dest('public/assets/js/'))
    cb()
}

function css(cb) {
    src('src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({extname: '.min.css'}))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('public/assets/css/'))
    cb()
}

exports.default = function () {
    watch('src/*.js', js)

    watch('src/*.scss', css)
}