<template>
    <div id="app">
      <RootHeader v-if="shouldShowNavigation"></RootHeader>
      <router-view></router-view>
    </div>
  </template>
<script>
  import { mapGetters } from 'vuex'
  import RootHeader from 'components/root/Header'

  export default {
    name: 'App',
    components: { RootHeader },
    created () {},
    computed: {
      ...mapGetters(['shouldShowNavigation'])
    }
  }
</script>

<style src="assets/stylesheets/app.scss" lang="scss"/>
