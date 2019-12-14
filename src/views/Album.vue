<template>
  <div class="album">
      <mu-card v-if="volumes">
        <mu-card-media :title="album.title" :sub-title="album.subtitle">
          <img :src="album.imageLinks.medium">
        </mu-card-media>
        <mu-card-text v-html="album.description">
        </mu-card-text>
      </mu-card>
  </div>
</template>

<script>
import { find } from 'lodash'
export default {
  name: 'Album',
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    album () {
      return find(this.volumes.filter((volume) => {
        if (volume.industryIdentifiers[0].identifier === this.$route.params.isbn) {
          return volume
        }
      }), 'title')
    }
  }
}
</script>

<style>
.album .mu-card-media {
  min-height: 104px;
}
</style>