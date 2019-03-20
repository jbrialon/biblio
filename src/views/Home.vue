<template>
  <div class="home">
    <mu-list textline="two-line">
      <router-link :to="{ name: 'about', params: { id: serie }}" v-for="(serie, index) in series" :key="index">
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="folder"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ getTitlePerSerieId(serie) }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </router-link>
    </mu-list>
  </div>
</template>

<script>
import { pickBy, find } from 'lodash'
export default {
  name: 'Home',
  methods: {
    getTitlePerSerieId (id) {
      return find(pickBy(this.volumes, (volume) => {
        if (volume.seriesInfo) {
          return volume.seriesInfo.volumeSeries[0].seriesId === id
        }
      }), 'title').title.split('-')[0].split('(')[0]
    }
  },
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    series () {
      return this.$store.getters.series
    }
  }
}
</script>
