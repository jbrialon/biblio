<template>
  <div class="about">
    <mu-list textline="two-line">
      <mu-sub-header>{{ this.$route.params.id }}</mu-sub-header>
      <mu-list-item avatar :ripple="false" button v-for="(volume, index) in serie" :key="index">
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
            <div v-for="(author, index) in volume.authors" :key="index">
              {{ author }}
            </div>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>

import { compact } from 'lodash'
export default {
  name: 'About',
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    serie () {
      return compact(this.volumes.map((volume) => {
        if (volume.seriesInfo && volume.seriesInfo.volumeSeries[0].seriesId === this.$route.params.id) {
          return volume
        }
      }))
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