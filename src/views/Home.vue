<template>
  <div class="home">
    <mu-container>
      <mu-tabs :value.sync="activeTab" inverse text-color="rgba(0, 0, 0, .54)" full-width>
        <mu-tab>Collections</mu-tab>
        <mu-tab>Albums</mu-tab>
      </mu-tabs>
      <div v-if="activeTab === 0">
        <mu-list textline="two-line" v-if="!error">
          <router-link :to="{ name: 'about', params: { id: serie }}" v-for="(serie, index) in series" :key="index">
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="getAvatar(serie)">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ getTitlePerSerieId(serie) }}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </router-link>
        </mu-list>
      </div>
      <div class="demo-text" v-if="activeTab === 1">
        <mu-list textline="two-line" v-if="!error">
          <router-link :to="{ name: 'album', params: { isbn: volume.industryIdentifiers[0].identifier }}" v-for="(volume, index) in volumesWithoutSerie" :key="index">
            <mu-list-item avatar :ripple="false" button>
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="volume.imageLinks.smallThumbnail">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ volume.title }}</mu-list-item-title>
                <mu-list-item-sub-title v-if="volume.subtitle">{{ volume.subtitle }}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </router-link>
        </mu-list>
      </div>
    </mu-container>
    <mu-alert color="error" v-if="error" class="error">
      <mu-icon left value="warning"></mu-icon>
     {{ error }}
    </mu-alert>
  </div>
</template>

<script>
import { pickBy, find, compact } from 'lodash'
export default {
  name: 'Home',
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    getTitlePerSerieId (id) {
      return find(pickBy(this.volumes, (volume) => {
        if (volume.seriesInfo) {
          return volume.seriesInfo.volumeSeries[0].seriesId === id
        }
      }), 'title').title.split('-')[0].split('(')[0].split('#')[0]
    },
    getAvatar (id) {
      return find(pickBy(this.volumes, (volume) => {
        if (volume.seriesInfo) {
          return volume.seriesInfo.volumeSeries[0].seriesId === id
        }
      }), 'title').imageLinks.smallThumbnail
    }
  },
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    volumesWithoutSerie () {
      return compact(this.$store.getters.volumes.map((volume) => {
        if (!volume.seriesInfo) {
          return volume
        }
      }))
    },
    series () {
      return this.$store.getters.series
    },
    error () {
      return this.$store.getters.error
    }
  }
}
</script>

<style>
.error {
  margin: 30px;
  width: calc(100% - 60px);
}
.mu-tabs-inverse,
.mu-tab {
  background:transparent;
}
</style>
