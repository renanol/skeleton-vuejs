<template lang="html">
  <div class="">
    <Login />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from './forms/Login';

export default {
  name: 'auth',
  components: {
    Login,
  },
  created() {
  },
  computed: {
    ...mapGetters(['isLogged']),
  },
};

</script>

<style lang="scss">
</style>
