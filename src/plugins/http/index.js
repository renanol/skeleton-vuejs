import axios from 'axios'
import interceptors from './interceptors'

export const http = axios.create({
  baseURL: 'http://teste.ead.fractaltecnologia.com.br/api/v1'
})

export function setToken (token) {
  http.defaults.headers.common['X-TOKEN'] = `${token}`
}

export default function install (Vue, { store, router }) {
  interceptors(http, store, router)
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return http
    }
  })
}
