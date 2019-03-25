<template>
  <div id="app">
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-appbar color="primary" class="appbar">
        <mu-tooltip :content="tooltipContent">
          <router-link :to="{ name: 'home' }">
            Biblio 8
          </router-link>
        </mu-tooltip>
        <mu-button flat slot="right" @click="random()">
          <mu-icon value="help"></mu-icon>
          suggestion
        </mu-button>
      </mu-appbar>
      <router-view/>
    </mu-paper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { sample } from 'lodash'
export default {
  name: 'app',
    methods: {
    ...mapActions([
      'getContent'
    ]),
    random () {
      const volume = sample(this.volumes)
      const randomVolume = volume ? volume.industryIdentifiers[0].identifier : null
      this.$router.push({ name: 'album', params: { isbn: randomVolume } })
    }
  },
  computed: {
    volumes () {
      return this.$store.getters.volumes
    },
    tooltipContent () {
      return `Nombre d'albums : ${this.$store.getters.volumes.length}`
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.appbar a {
  color:white;
}
.appbar .mu-icon {
  margin-right:5px;
}
</style>
