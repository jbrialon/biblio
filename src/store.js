import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import { uniqBy } from 'lodash'

const id = [
  'zsBDDwAAQBAJ',
  '1MBDDwAAQBAJ',
  'zMBDDwAAQBAJ',
  'ttWIDwAAQBAJ',
  'uNWIDwAAQBAJ',
  'gNWIDwAAQBAJ',
  'ahtrDwAAQBAJ',
  'lrpwDwAAQBAJ',
  '1-2DDwAAQBAJ',
  'Ank5DwAAQBAJ'
]
let promises = []
let googleKey = 'AIzaSyCNQvQc3ty4yUjwngKsgo1aViGhJsess7c'

export default new Vuex.Store({
  state: {
    volumes: []
  },
  mutations: {
    pushContent (state, volume) {
      state.volumes.push(volume)
    }
  },
  actions: {
    getContent ({ commit }) {
      for (var i = 0; i < id.length; i++){
        promises.push(axios.get(`https://www.googleapis.com/books/v1/volumes/${id[i]}?key=${googleKey}`))
      }
      axios.all(promises).then((responses) => {
        responses.forEach((response) => {
          commit('pushContent', response.data.volumeInfo)
        })
      })
    }
  },
  getters: {
    volumes: state => {
      return state.volumes
    },
    series: state => {
      return uniqBy(state.volumes.map((volume) => {
        return volume.title
      }))
    }
  }
})
