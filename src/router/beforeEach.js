import store from '../vuex';

const needAuth = auth => auth === true;

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth;
  if (!needAuth(auth)) {
    next();
    return;
  }
  store.dispatch('checkUserToken')
  .then(() => {
    next();
  })
  .catch(() => {
    next({ name: 'auth.main' }); // redirect to login
  });
};

export default beforeEach;
