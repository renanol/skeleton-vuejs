import localforage from 'localforage'
// plugins and src are alias. see client/build/webpack.base.conf.js
import { userTokenStorageKey, userStorageKey } from '@/config'
import { setToken as httpSetToken } from '@/plugins/http'
import * as TYPES from './mutations-type'

const subscribe = (store) => {
  store.subscribe((mutation, { Auth }) => {
    if (TYPES.SET_TOKEN === mutation.type) {
      httpSetToken(Auth.token)
      localforage.setItem(userTokenStorageKey, Auth.token)
    }
    if (TYPES.SET_USER === mutation.type) {
      localforage.setItem(userStorageKey, Auth.user)
    }
  })
}

export default (store) => {
  subscribe(store)
}
