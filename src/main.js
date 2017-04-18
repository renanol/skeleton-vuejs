// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-material/dist/vue-material.css';
import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import VueMaterial from 'vue-material';
import ptBR from 'vee-validate/dist/locale/pt_BR';
import Root from './Root';
import store from './vuex';
import router from './router/';
import httpPlugin from './plugins/http';

Validator.addLocale(ptBR);

Vue.use(httpPlugin, { store, router });

Vue.use(VeeValidate, {
  locale: 'pt_BR',
});

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'black',
  accent: 'red',
  warn: 'red',
});

Vue.config.productionTip = false;
sync(store, router); // https://github.com/vuejs/vuex-router-sync/tree/next


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<Root/>',
  components: { Root },
});
