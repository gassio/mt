import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // JWPlayer DB
        feeds: ['ccPaHVIt', 'O2LEnFP4'], // playlist ids
        playlistNames: []
    }
})