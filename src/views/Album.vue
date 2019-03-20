<template>
  <div class="album">

  </div>
</template>

<script>
import { pickBy } from 'lodash'

export default {
  name: 'Album',
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    serie () {
      return pickBy(this.volumes, ({ title }) => title === this.$route.params.title)
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