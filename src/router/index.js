import Vue from 'vue'
import Router from 'vue-router'
import { routes as app } from '../app'
import beforeEach from './beforeEach'

Vue.use(Router)

const routes = [...app]

const router = new Router({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

router.beforeEach(beforeEach)

export default router
