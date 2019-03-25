<template>
  <div class="about">
    <mu-list textline="two-line" v-if="volumes">
      <mu-sub-header>{{ title }}</mu-sub-header>
      <router-link :to="{ name: 'album', params: { isbn: volume.industryIdentifiers[0].identifier }}" v-for="(volume, index) in serie" :key="index">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <img :src="volume.imageLinks.smallThumbnail">
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>
              <template v-if="volume.subtitle">
                {{ volume.subtitle }}
              </template>
              <template v-else>
                {{ volume.title }}
              </template>
            </mu-list-item-title>
            <mu-list-item-sub-title>
              <div v-if="volume.seriesInfo.bookDisplayNumber">
                Vol {{ volume.seriesInfo.bookDisplayNumber }}
              </div>
              <div v-for="(author, index) in volume.authors" :key="index">
                {{ author }}
              </div>
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </router-link>
    </mu-list>
  </div>
</template>

<script>
import { compact, sortBy } from 'lodash'
export default {
  name: 'About',
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    serie () {
      return sortBy(compact(this.volumes.map((volume) => {
        if (volume.seriesInfo && volume.seriesInfo.volumeSeries[0].seriesId === this.$route.params.id) {
          return volume
        }
      })), (volume) => {
        return parseInt(volume.seriesInfo.bookDisplayNumber, 10)
      })
    },
    title () {
      return this.serie ? this.serie[0].title.split('-')[0].split('(')[0] : ''
    }
  }
}
</script>

<style>
.about .mu-list-two-line .mu-item {
  height:200px;
}

.about .mu-list-two-line .mu-item img {
  width:100%;
}

.about .mu-list-two-line .mu-item .mu-item-content {
  padding-left:10px;
}
</style>