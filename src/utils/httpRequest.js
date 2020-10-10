import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import merge from 'lodash/merge'
import {
  log
} from 'util';
// import router from 'vue-router'
// axios.defaults.baseURL = 'http://localhost:3000'
var http = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    // 'Content-Type':'application/x-www-form-urlencoded'
    // token:Vue.cookie.get('token')
  },
})
// http.defaults.baseUrl = 'http://localhost:3000'
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  console.log(config.method,'config.method');
  
  config.headers['token'] = Vue.cookie.get('token')
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {

  if (response.data && response.data.code == 401) {
    // token失效
    // 清除cookie数据，并返回到登录页面
    clearLoginInfo()
    router.push({
      name: 'login'
    })
  }
  return response.data
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址
 */
http.addUrl = (name) => {
  return (process.env.NODE_ENV && process.env.NODE_ENV !== 'production' ? http.defaults.baseUrl : window.SITE_CONFIG.baseUrl) + name
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
/**
 * 请求参数处理
 * 加时间戳
 */
export default http
