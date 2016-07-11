/*
 命令列表：
    gulp            // 默认的任务,包含connect、watch

    gulp html       // 生成html
    gulp less       // 生成less
    gulp js         // 生成js

    gulp all        //包含gulp sprite、gulp imagemin
    gulp sprite     // 生成sprite 雪碧图
    gulp imagemin   // 压缩original中的图片

    gulp clean      //清理生成的文件(Static、less/sprite)
    gulp create     // 生成image、html、css、js

    config    //**** 需要更改的配置项 ***********
 */

var config = {
    base: 'D:/ESH/Compatible/',
    singleWatch: true,
};

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gulpSequence = require('gulp-sequence');

// 引入gulp组件(插件)
var watch = require('gulp-watch');
var connect = require('gulp-connect');

var sprity = require('pure-sprity');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');

var fileinclude = require('gulp-file-include');

var clean = require('gulp-clean');
// var spritesmith = require('gulp.spritesmith');

var path = require('path');
/*********************服务、总任务************************/
//静态web服务器配置
gulp.task('connect', function() {
    connect.server({
        root: './Static/',
        port: 8180,
        livereload: true
    });
});
//connect实时刷新
gulp.task('reload',function() {
    gulp.src('./Static/html/**/*.html')
        .pipe(connect.reload());
});
// 清理生成文件
gulp.task('clean',function(){
    gulp.src(['Static/','less/sprite'], {read: false})
        .pipe(clean());
});
// 发布生产
gulp.task('create',function(cb){
    gulpSequence('all',['less','js','html'],cb);
});

/*********************分任务************************/
// Html
gulp.task('html', function() {
    // return: 防止出现文件写入出错
    return gulp.src('./html/**/*.html')
        .pipe(fileinclude({prefix: '@@',basepath: 'html/'}))
        .pipe(gulp.dest('./Static/html'));
});

// Less
gulp.task('less', function () {
    return gulp.src('./less/production/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./Static/css/production'));
});

// Js
gulp.task('js', function () {
    gulp.src('./js/**/*.*')
        .pipe(gulp.dest('./Static/js/front'));
    gulp.src('./video/**/*.*')
        .pipe(gulp.dest('./Static/video'));
});

// 图片压缩
gulp.task('imagemin', function () {
    return gulp.src('./images/original/**/*.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./Static/images/production'));
});

// 雪碧图
gulp.task('sprite',function() {
    return sprity.src({
        //获取路径
        src: 'images/icon/**/*.png',
        //生成less名称
        style: 'less/sprite/sprite.less',
        //生成类型
        processor: 'pure-sprity-less',
        //图片引擎
        engine: 'sprity-gm',
        //按照文件夹split
        split: true,
        cssPath: '/images/production'
    })
    // .pipe(imagemin())
    .pipe(gulpif('*.png', gulp.dest('./Static/images/production'), gulp.dest('./less/sprite/')))
});
// 清理图片
gulp.task('cleanImg',function(){
    gulp.src('Static/images/production', {read: false})
        .pipe(clean());
});
// 图片处理
gulp.task('all',function(cb){
    gulpSequence('cleanImg','sprite','imagemin',cb);
});

/*********************监听处理************************/
var pathArr,srcPath,distPath;
var watchHandle = function(event,oldPath,rePath,flag){
    var temp;
    pathArr = event.path.split(path.sep);
    srcPath = pathArr.join("/");  //D:ESH/Mine/GulpTest/less/production/easydata/index.less

    temp = distPath = config.base + rePath+ srcPath.slice(config.base.length + oldPath.length);  // "less/production/"
    distPath = distPath.slice(0,distPath.lastIndexOf('/'));

    console.log(srcPath + ':changed');
    if(flag == 1){
        distPath = temp;
    }
    if(flag == 2){
        srcPath = srcPath.slice(0,srcPath.lastIndexOf('/')) + '/*.png';
    }
}

// 监控执行串行任务
gulp.task('imageminReload',function(cb){
    gulpSequence('imagemin','reload',cb);
});

//
var watchSwitch = true;
// Watch
gulp.task('watch', function() {
    //监听生产环境目录变化
    // watch不能用'./',否则不支持监听新增的文件
    gulp.watch('html/**/*.html',function(event){
        if(event.type != 'deleted'){
            watchHandle(event,'html/','Static/html/');
            if(config.singleWatch){
                gulp.src(srcPath)
                   .pipe(fileinclude({prefix: '@@',basepath: 'html/'}))
                   .pipe(gulp.dest(distPath)).pipe(connect.reload());
            } else {
                gulp.src('html/**/*.html')
                    .pipe(fileinclude({prefix: '@@',basepath: 'html/'}))
                    .pipe(gulp.dest('./Static/html'))
                    .on('finish',function(){
                        return gulp.src('html/**/*.*', {read: false})
                            .pipe(connect.reload());
                    });
            }
        }
    });
    gulp.watch('less/production/**/*.less',function(event){
        if(event.type != 'deleted'){
            watchHandle(event,'less/production/','Static/css/production/');
            if(config.singleWatch) {
                gulp.src(srcPath)
                    .pipe(less())
                    .pipe(gulp.dest(distPath)).pipe(connect.reload());
            } else {
                gulp.src('./less/production/**/*.less')
                    .pipe(less())
                    .pipe(gulp.dest('./Static/css/production'))
                    .on('finish',function(){
                        return gulp.src('html/**/*.*', {read: false})
                            .pipe(connect.reload());
                    });
            }
        }
    });
    gulp.watch('js/**/*.*',function(event){
        if(event.type != 'deleted'){
            watchHandle(event,'js/','Static/js/front/');
            gulp.src(srcPath)
                .pipe(gulp.dest(distPath)).pipe(connect.reload());
        }
    });
    gulp.watch('images/original/**/*.*',function(event){
        // 删除Static下对应的文件
        if(event.type == 'deleted'){
            watchHandle(event,'images/original/','Static/images/production/',1);
            gulp.src(distPath, {read: false})
                .pipe(clean())
                .on('finish',function(){
                    return gulp.src('html/**/*.*', {read: false})
                        .pipe(connect.reload());
                });
            // 压缩新增的或者改变的文件到Static下
        }else{
            watchHandle(event,'images/original/','Static/images/production/');
            gulp.src(srcPath)
                // .pipe(imagemin())
                .pipe(gulp.dest(distPath))
                .on('finish',function(){
                    return gulp.src('html/**/*.*', {read: false})
                        .pipe(connect.reload());
                });

        }
    });

    gulp.watch('images/icon/**/*.png',function(event){
        if(watchSwitch) {
            watchSwitch = false;
            watchHandle(event,'images/icon/','Static/images/production/',2);

            var startIndex = config.base.length + 'images/icon/'.length;
            var endIndex = srcPath.lastIndexOf('/');
            var distLessPath = config.base + 'less/sprite/' + srcPath.slice(startIndex,endIndex);   // "images/icon/"
            var folderStru = distLessPath.slice(config.base.length + 'Less/sprite/'.length);
            folderStru = folderStru.split('/').join('-');                                           //VIP-common-index
            var spriteImgName = 'sprite-' + folderStru +'.png';                                     //sprite-VIP-common-index.png

            sprity.src({
                    //获取路径
                    src: srcPath,
                    //生成less名称
                    style: 'less/sprite/sprite.less',
                    //生成类型
                    processor: 'pure-sprity-less',
                    //图片引擎
                    engine: 'sprity-gm',
                    //按照文件夹split
                    split: true,
                    cssPath: '/images/production',
                    cusName: spriteImgName,
                    cusFolderStru: folderStru,
                })
                // .pipe(imagemin())
                .pipe(gulpif('*.png', gulp.dest(distPath), gulp.dest(distLessPath)))
                .on('finish',function(){
                    console.log('Compile Less File!');
                    watchSwitch = true;
                    gulp.src('./less/production/**/*.less')
                        .pipe(less())
                        .pipe(gulp.dest('./Static/css/production'))
                        .on('finish',function(){
                            return gulp.src('html/**/*.*')
                                .pipe(connect.reload());
                        });
                });
        };
    });
});

//默认任务
gulp.task('default', ['connect', 'watch']);


/***************************************/
// var buffer = require('vinyl-buffer');
// // Images commbo | Css sprite
// gulp.task('sprite', function () {

//     // var spriteData = gulp.src(['images/test/circle.png','images/test/closeBtn.png']).pipe(spritesmith({
//     var spriteData = gulp.src('images/**/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         cssName: 'sprite.css',
//         imgPath: '/**/'
//     }));

//     var imgStream = spriteData.img
//         .pipe(buffer())
//         .pipe(imagemin())       //压缩合并的图片
//         .pipe(gulp.dest('Static/images'));

//     var cssStream = spriteData.css
//         .pipe(gulp.dest('Less/sprite'));

//   //  return merge(imgStream, cssStream);
// });

// 仍然停止
// gutil = require('gulp-util'),
// gulp.task('coffee', function() {
//   return gulp.src(path.scripts)
//     .pipe(coffee())
//     .on('error', gutil.log) // 在这里捕捉编译错误
//     .pipe(gulp.dest('js'));
// });
// 打补丁 捕获异常 避免错误的时候退出
// var plumber = require('gulp-plumber');
// gulp.task('coffee', function() {
//   return gulp.src(path.scripts)
//     .pipe(plumber()) //plumber给pipe打补丁
//     .pipe(coffee())
//     .pipe(gulp.dest('js'));
// });
