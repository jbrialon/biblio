import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import { uniqBy, compact } from 'lodash'

const id = [
  'nc3oCwAAQBAJ',
  'krYPHmNk6TwC',
  's1DlCwAAQBAJ',
  'Xf0qAwAAQBAJ',
  'zsBDDwAAQBAJ',
  '1MBDDwAAQBAJ',
  'zMBDDwAAQBAJ',
  'ttWIDwAAQBAJ',
  'uNWIDwAAQBAJ',
  'gNWIDwAAQBAJ',
  'ahtrDwAAQBAJ',
  'lrpwDwAAQBAJ',
  '1-2DDwAAQBAJ',
  'Ank5DwAAQBAJ',
  '9c2gAQAAQBAJ',
  'O_i8AwAAQBAJ',
  'sy0qBgAAQBAJ',
  'ED1oDAAAQBAJ',
  'DaZ_DAAAQBAJ',
  '7_V7DQAAQBAJ',
  'RaeuAQAAQBAJ',
  'nbgjaiE-RKgC',
  'chBz_If57kQC',
  'xnwVBgAAQBAJ',
  'nja5dVitkPwC',
  'RV7PAQAAQBAJ',
  'l0EEDAAAQBAJ',
  'FtAwBgAAQBAJ',
  'QN4wBgAAQBAJ',
  'AMZlDQAAQBAJ',
  'IQxkKKErfyUC',
  'orm6SviFKFwC',
  'ZANzsdkPFgoC',
  'kR4W9D5ZPrIC',
  'YgLPvmxDyKwC',
  '8mzDfMne2U0C',
  '2wSm4snNw2QC',
  'HwzoF-L2TTwC',
  '97OFzbyIUFUC',
  'uaZqLoQoQk8C',
  '5VHiAAAAQBAJ',
  'onWtBAAAQBAJ',
  'Y48pCwAAQBAJ',
  'FPZ7DQAAQBAJ',
  'Z-tqDwAAQBAJ',
  'MaKuAQAAQBAJ',
  'BaGuAQAAQBAJ',
  'zaGuAQAAQBAJ',
  'ip2aDqPPKc4C'
]
let promises = []
let googleKey = 'AIzaSyCNQvQc3ty4yUjwngKsgo1aViGhJsess7c'

export default new Vuex.Store({
  state: {
    volumes: [],
    error: ''
  },
  mutations: {
    pushContent (state, volume) {
      state.volumes.push(volume)
    },
    setError (state, message) {
      state.error = message
    }
  },
  actions: {
    getContent ({ commit }) {
      for (var i = 0; i < id.length; i++){
        promises.push(axios.get(`https://www.googleapis.com/books/v1/volumes/${id[i]}?key=${googleKey}`))
      }
      axios.all(promises)
        .then((responses) => {
          responses.forEach((response) => {
            commit('pushContent', response.data.volumeInfo)
          })
        }).catch((error) => {
          if (error.response) {
            commit('setError', error.response.data.error.message)
          }
        })
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
    },
    error: state => {
      return state.error
    },
  }
})
