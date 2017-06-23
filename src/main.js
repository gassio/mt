import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

const router = new VueRouter({
  routes,
  mode: 'history'
})

export const eventBus = new Vue({
  data: {
    feeds: ['ccPaHVIt', 'O2LEnFP4'], // playlist ids
    playlistNames: [],
    namesAndFeeds: [], // playlists names and playlist id ==> { 'NasaClass' : 'ccPaHVIt' }
    videos: [],
  },
  methods: {
    navigateBack(that) {
      that.$router.go(-1)
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Vue.config.productionTip = false