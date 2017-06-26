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
    // JWPlayer DB
    feeds: ['ccPaHVIt', 'O2LEnFP4'], // playlist ids
    playlistNames: [],
    videos: [],
    // Our DB
    allAnnotations: [
      { title: 'Posture & Stance', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3', author: 'Ben Domino', videoID: 'wUu9NAdZ' },
      { title: 'Volume, rate and pitch', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3', videoID: 'TIz5jlaL' },
      { title: 'Visual design', desc: 'Yeah baby!', from: '01:04', to: '05:15', rating: '2', author: 'Ben Domino', videoID: 'TIz5jlaL' },
    ],
  },
  methods: {
    navigateBack(that) {
      that.$router.go(-1)
    }
  }
})

// DATA
// namesAndFeeds: [], // playlists names and playlist id ==> { 'NasaClass' : 'ccPaHVIt' }

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Vue.config.productionTip = false