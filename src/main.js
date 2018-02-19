import Vue from 'vue'
import App from './App.vue'

import { store } from './store/store'

import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)

import AuthService from './services/AuthService'
export const myAuth = new AuthService('asd')

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })

import ReadMore from 'vue-read-more';
Vue.use(ReadMore);

// Load the full build.
global._ = require('lodash');

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.filter('sliceDate', function(value) {
  // Checks if presentedAt value exists in the video object
  if (typeof value !== 'undefined')
    return value.toString().slice(0,10)
})

new Vue({
  el: '#app',
  router,
  store,
  myAuth,
  render: h => h(App)
})

Vue.config.productionTip = false