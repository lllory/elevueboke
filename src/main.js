// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import '@/element-ui'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import echarts from 'echarts'
// import ueditor from 'ueditor'
// import '@/icons'
import httpRequest from '@/utils/httpRequest'
import axios from 'axios'

Vue.use(VueCookie)

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$http = httpRequest
Vue.prototype.$echarts = echarts
// Vue.prototype.$ueditor = ueditor
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
