<template>
  <div class="album">
      {{ this.$route.params.title }}
      <p v-html="album.description ">
      </p>
  </div>
</template>

<script>
import { pickBy, find } from 'lodash'

export default {
  name: 'Album',
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    album () {
      return find(pickBy(this.volumes, ({ subtitle }) => subtitle === this.$route.params.title), 'title')
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