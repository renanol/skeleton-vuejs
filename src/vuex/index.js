import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import plugins from './plugins';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins,
  getters,
  strict: process.env.NODE_ENV !== 'production',
});
