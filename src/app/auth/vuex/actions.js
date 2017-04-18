import { userTokenStorageKey, userStorageKey } from '@/config';
import { isEmpty } from 'lodash';
import localforage from 'localforage';
import * as TYPES from './mutations-type';
import * as services from '../services';

export const attemptLogin = ({ dispatch }, payload) => {
  services.postLogin(payload.login, payload.password)
  .then((data) => {
    dispatch('setUser', data);
    dispatch('setToken', data.token);
    return data;
  });
};

export const logout = ({ dispatch }) => {
  services.revokeToken();
  return Promise.all([
    dispatch('setToken', null),
    dispatch('setUser', {}),
  ]);
};


export const setUser = ({ commit }, user) => {
  commit(TYPES.SET_USER, user);
  Promise.resolve(user);
};

export const setToken = ({ commit }, payload) => {
  const token = (isEmpty(payload)) ? null : payload.token || payload;
  commit(TYPES.SET_TOKEN, token);
  return Promise.resolve(token);
};

export const checkUserToken = ({ dispatch, state }) => {
  if (!isEmpty(state.token)) {
    return Promise.resolve(state.token);
  }

  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */
  return localforage.getItem(userTokenStorageKey)
    .then((token) => {
      if (isEmpty(token)) {
        // Token is not saved in localstorage
        return Promise.reject('NO_TOKEN');
      }
      // Put the token in the vuex store
      return dispatch('setToken', token);
    }).then(() => dispatch('loadUser'));
};

export const loadUser = ({ dispatch }) => {
  localforage.getItem(userStorageKey)
    .then((response) => {
      dispatch('setUser', response);
    })
    .catch(() => {
      dispatch('setToken', '');
      return Promise.reject('FAIL_IN_LOAD_USER');
    });
};
