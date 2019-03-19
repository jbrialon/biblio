<template>
  <div id="app">
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-appbar color="lightBlue" class="appbar">
        <router-link :to="{ name: 'home' }">
          Biblio
        </router-link>
      </mu-appbar>
      <router-view/>
    </mu-paper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
    methods: {
    ...mapActions([
      'getContent'
    ])
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
</style>
