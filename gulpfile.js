/*******************************************************************************************
  Dependencies
*******************************************************************************************/

var gulp = require('gulp'),                               // gulp核心
    autoprefixer = require('autoprefixer'),               // 处理浏览器私有前缀
    cssnext = require('cssnext'),                         // 使用CSS未来的语法(http://cssnext.io/features)
    precss = require('precss'),                           // 像Sass的函数(https://github.com/jonathantneal/precss)
    postcss = require('gulp-postcss'),                    // postcss 转化器
    sass = require('gulp-sass'),
    cssnano = require('cssnano');                         // 压缩css
    browserSync = require('browser-sync');                // 注入代码到所有文件中(https://browsersync.io/docs/options/)

/*******************************************************************************************
  Src and Dest
*******************************************************************************************/

var src = {
    css: 'src/css/*.css',
    scss: 'src/sass/*.scss'
};

var dest = {
    css: 'dist/css'
};

/*******************************************************************************************
  CSS Task
*******************************************************************************************/

gulp.task('postcss', function () {
    var processors = [                                  // https://github.com/ai/browserslist
        autoprefixer({                                  // 默认是 > 1%, last 2 versions, firefox ESR
            browsers: ['> 5%', 'last 5 versions', 'Firefox >= 20', 'IE >= 7']
        }),    
        cssnext,
        precss,
        //cssnano()
    ];
    return gulp.src(src.css)
               .pipe(postcss(processors))
               .pipe(gulp.dest(dest.css));
});

/*******************************************************************************************
  SASS Task
*******************************************************************************************/

gulp.task('sass', function () {
    var processors = [                                  // https://github.com/ai/browserslist
        autoprefixer({                                  // 默认是 > 1%, last 2 versions, firefox ESR
            browsers: ['> 5%', 'last 5 versions', 'Firefox >= 20', 'IE >= 7']
        }),    
        cssnext,
        precss,
        cssnano()
    ];
    return gulp.src(src.scss)
               .pipe(sass().on('error', sass.logError))
               .pipe(postcss(processors))
               .pipe(gulp.dest(dest.css));
});

/*******************************************************************************************
  Browser Sync Task
*******************************************************************************************/

gulp.task('browser-sync', function () {
  browserSync.create().init({
    notify: false,                                     //浏览器上不显示通知信息
    browser: "google chrome",                          //默认使用chrome浏览器
    server: {
      baseDir: 'build'                                 //服务默认路径
    },
    port: 3333,
    files: [                                           //指定文件注入
      'dist/*.html', 
      'dist/css/*.css', 
      'dist/js/*.js'
    ]       
  });
});

/*******************************************************************************************
  Gulp Tasks
*******************************************************************************************/

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(src.css, ['postcss']);
});

gulp.task('default', [
    'postcss'
],function () {
    console.log('gulp done!')
});