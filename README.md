# elevue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



#  babel-polyfill识别es6语法
npm i babel-polyfill --save
引入方式三种  require('babel-polyfill')
            import 'babel-polyfill'
            在webpack的entry中引入


#gulp打包
npm i gulp 
npm i gulp-load-plugins
npm i gulp-shell
npm i gulp-replace
npm i gulp-concat
npm i del
