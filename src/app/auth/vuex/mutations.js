/* eslint-disable */
import * as TYPES from './mutations-type'

export default {
  [TYPES.SET_USER](state, user) {
    state.user = user
  },
  [TYPES.SET_TOKEN](state, token) {
    state.token = token
  }
}
