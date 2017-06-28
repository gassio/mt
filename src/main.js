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
      { 
        title: 'Posture & Stance',
        desc: 'Posture and stance project confidence, and allow speaker to interact with audience and screen',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', 
        from: '03:05',
        to: '03:17', 
        rating: '3', 
        author: 'Ben Domino', 
        canon: 'Delivery',
        category: 'posture',
        videoID: 'wUu9NAdZ' 
      },
      { title: 'Volume, rate and pitch', desc: 'Volume, rate, and pitch are appropriate and modulated', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3', canon: 'Delivery', category: 'volume', videoID: 'TIz5jlaL' },
      { title: 'Graphics', desc: 'Graphics show relevant data/concepts to support the claims', comment: 'Hello!', from: '01:04', to: '05:15', rating: '2', author: 'Ben Domino', canon: 'Visual', category: 'graphics', videoID: 'TIz5jlaL' },
      { title: 'Example move', comment: 'This is move', from: '01:04', to: '05:15', rating: '2', author: 'Ben Domino', canon: 'Moves', category: 'Moves', videoID: 'TIz5jlaL' },
    ],
    canons: [
      { 
        name: 'Structure', 
        categories: [
          { 
            name: 'Terms',
            desc: 'Provides overview of the talk, emphasizing the connection between key terms and concepts'
          },
          { 
            name: 'Conceptual transitions',
            desc: 'Uses conceptual transitions to connect key sections of the presentation'
          },
          { 
            name: 'Line of argument',
            desc: 'Provides a clear line of argument which is brought to a clear position at the end'
          },
          { 
            name: 'Central moves',
            desc: 'Uses the central rhetorical moves for each section appropriately '
          }
        ]
      },
      { 
        name: 'Delivery', 
        categories: [
          { 
            name: 'Volume',
            desc: 'Volume, rate, and pitch are appropriate and modulated'
          },
          { 
            name: 'Gestures',
            desc: 'Gestures, eye contact, and body movement used intentionally to engage audience'
          },
          { 
            name: 'Metadiscourse',
            desc: 'Metadiscourse orients listener and helps transition between sections'
          },
          { 
            name: 'Posture',
            desc: 'Posture and stance project confidence, and allow speaker to interact with audience and screen'
          },
          { 
            name: 'Language',
            desc: 'Technical and informal language are both employed as appropriate'
          }
        ]
      },
      { 
        name: 'Visual', 
        categories: [
          { 
            name: 'Pictorial cues',
            desc: 'Uses primarily pictorial cues (limited text)'
          },
          { 
            name: 'Slide titles',
            desc: 'Uses assertion-based slide titles to convey key concepts (including title slide)'
          },
          { 
            name: 'Image-text highlight',
            desc: 'Images and text highlight/focus audience on key points'
          },
          { 
            name: 'Graphics',
            desc: 'Graphics show relevant data/concepts to support the claims'
          },
          { 
            name: 'Memorable images',
            desc: 'Memorable images provide necessary context to support the oral discussion'
          }
        ]
      },
    ]
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