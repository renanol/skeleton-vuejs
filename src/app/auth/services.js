/* eslint-disable */

import { http } from 'plugins/http'
import { getData } from 'utils/get'

export const postLogin = (login, password) =>  http.post('http://datagateway.fractaltecnologia.com.br/api/v1/users/auth', {
    login: login,
    password: btoa(password),
  }).then(getData)

export const loadUserData = () => http.get('/me').then(getData)

export const revokeToken = () => {
  http.post('http://datagateway.fractaltecnologia.com.br/api/v1/users/logout')
    .then(response => response.data)
}
