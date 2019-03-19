<template>
  <div class="home">
    <mu-list textline="two-line">
      <router-link :to="{ name: 'about', params: { title: serie }}" v-for="(serie, index) in series" :key="index">
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="folder"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ serie }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </router-link>
    </mu-list>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    series () {
      return this.$store.getters.series
    }
  }
}
</script>
