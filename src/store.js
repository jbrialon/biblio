import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { uniqBy, compact } from 'lodash'
import data from './data/data.json'

export default new Vuex.Store({
  state: {
    volumes: []
  },
  mutations: {
    pushContent (state, json) {
      state.volumes = json
    }
  },
  actions: {
    getContent ({ commit }) {
      commit('pushContent', data)
    }
  },
  getters: {
    volumes: state => {
      return state.volumes
    },
    series: state => {
      return compact(uniqBy(state.volumes.map((volume) => {
        if (volume.seriesInfo) {
          return volume.seriesInfo.volumeSeries[0].seriesId
        }
      })))
    }
  }
})
