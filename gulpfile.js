var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var path = require('path')
var del  = require('del')

var distPath = path.resolve('./dist')
var version = ''; //版本号
var versionPath = ''; //版本号路径
var env = 'prod'; //运行环境


// 创建版本号
;
(function () {
  var d = new Date()
  var yyyy = d.getFullYear().toString().slice(2)
  var MM = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
  var DD = d.getDay() >= 10 ? d.getDay() : '0' + d.getDay()
  var hh = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
  var mm = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
  version = yyyy + MM + DD + hh + mm
  versionPath = distPath + '/' + version
})()

// webpack打包
gulp.task('build', $.shell.task(['node build/build.js']))

// 把dist文件里面的内容移到新创建的版本号里面
gulp.task('create:versionCatalog', ['build'], function () {
  return gulp.src(`${distPath}/static/**/*`)
    .pipe(gulp.dest(`${versionPath}/static/`))
})

// 把mainfest.js的路径换成cdnUrl的地址 
gulp.task('replace:cdnUrl', ['create:versionCatalog'], function () {
  return gulp.src(`${versionPath}/static/js/manifest.js`)
    .pipe($.replace(new RegExp(`"${require('./config').build.assetsPublicPath}"`, 'g'), 'window.SITE_CONFIG.cdnUrl + "/"'))
    .pipe(gulp.dest(`${versionPath}/static/js/`))
})

// 替换版本号等于当前版本号 window.SITE_CONFIG.version
gulp.task('replace:version', ['create:versionCatalog'], function () {
  return gulp.src(`${versionPath}/static/config/index-${env}.js`)
    .pipe($.replace(/window.SITE_CONFIG\['version'\] = '.*'/g, `window.SITE_CONFIG['version'] = '${version}'`))
    .pipe(gulp.dest(`${versionPath}/static/config/`))
})

// 合并config下面的文件到index.js里面
gulp.task('concat:config',['replace:version'],function(){
   return gulp.src([`${versionPath}/static/config/index-${env}.js`,`${versionPath}/static/config/init.js`])
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(`${distPath}/config/`))
})

gulp.task('clean',function(){
    return del[versionPath]
})


gulp.task('default',['clean'],function(){
    gulp.start(['build', 'create:versionCatalog', 'replace:cdnUrl', 'replace:version','concat:config'],function(){
        del([`${distPath}/static`,`${versionPath}/static/config`])
    })
} )
