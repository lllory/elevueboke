import Vue from 'vue'
import Router from 'vue-router'
import {
  clearLoginInfo
} from '@/utils'
import http from '@/utils/httpRequest'
import {
  log
} from 'util';



Vue.use(Router)



const _import = require('./import-' + process.env.NODE_ENV)

const mainRoutes = {
  path: '/',
  component: _import('main'),
  // component: import('../views/main.vue'),
  name: 'main',
  meta: {
    title: '主入口布局'
  },
  children: [
    {path: '/home',component: _import('common/home'),name: 'home', meta: {title: "首页"} },
    {path: '/cute-animal',component: _import('modules/animal/cute-animal'),name: 'cute-animal', meta: {title: "最萌动物"} },
    {path: '/query-animal',component: _import('modules/animal/query-animal'),name: 'query-animal', meta: {title: "动物专场"}},
    {path: '/menu',component: _import('modules/sys/menu'),name: 'menu', meta: {title: "菜单管理"}}

  ],
  beforeEnter(to, from, next) {
    let token = Vue.cookie.get('token')
    let username = Vue.cookie.get('username')
console.log(token,'token------------');

    if(!token || !/\S/.test(token) || !username || !/\S/.test(username)){
      clearLoginInfo()
      next({name:'login'})
    }else{
      next()
    }
    // next()

  }
}
const globalRoutes = [
  // { path: '/404', component: import('common/404'), name: '404', meta: { title: '404未找到' } },
  {
    path: '/login',
    component: _import('common/login'),
    // component: import('@/views/common/login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  },
]
// 处理返回数据
function treeDataTranslate(data , menuId = 'id' , pid = 'parentId'){
  var temp = []
  var res = []
  for (let i = 0; i < data.length; i++) {
      temp[data[i][menuId]] = data[i];
  }
  for (let k = 0; k < data.length; k++) {
      if(temp[data[k][pid]] && data[k][menuId] !== data[k][pid]){
        // temp[data[k][pid]]['list'] = []
        if(!temp[data[k][pid]]['list']){
              temp[data[k][pid]]['list'] = []
          }
          temp[data[k][pid]]['list'].push(data[k]) 
      }else{
          res.push(data[k])
      }
  }
  return res
  // debugger
} 

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  isAddDynamicMenuRoutes:false,
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  let dataList = []
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to , globalRoutes) === 'global' ) {
    next()
  } else {
    http({
      url: http.addUrl('/admin/menulist'),
      method: 'post',
    }).then(data => {
      if (data.code == 0) {
        dataList = treeDataTranslate(data.list,'menuId')
        router.options.isAddDynamicMenuRoutes = true
        fnAddDynamicMenuRoutes(dataList)
        sessionStorage.setItem('menuList', JSON.stringify(dataList))
        next({
          ...to,
          replace: true
        })
      } else {
        sessionStorage.setItem('menuList', '[]')
        next()
      }

    }).catch(err => {
      // router.push({
      //   name: 'login'
      // })
      next({name:'login'})
    })
  }


})

function fnCurrentRouteType(route , globalRoutes = []){
  var temp = []
  for(var i = 0 ; i < globalRoutes.length ; i++){
    if(route.path == globalRoutes[i].path){
      return 'global'
    }else if(globalRoutes[i].children && globalRoutes[i].children.length >=1){
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route , temp) : 'main'
}

/**
 * 添加动态路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
  var temp = []
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].name,
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // URL以http[s]开头，痛iframe展示
      if (/^http[s]?:\/\/.*/.test(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
         
          
        } catch (error) {

        }
        routes.push(route)
      }
    }


  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      {
        path: "*",
        redirect: {
          name: '404'
        }
      }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
  }
}

export default router
