import Vue from 'vue'
import App from './App.vue'

import { store } from './store/store'

import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// Load the full build.
global._ = require('lodash');

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.filter('sliceDate', function(value) {
  return value.slice(0,10)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.config.productionTip = false