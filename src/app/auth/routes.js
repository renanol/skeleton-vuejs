import Main from './components/Main'

export default [
  {
    path: '/auth',
    component: Main,
    name: 'auth.main',
    meta: { requiresAuth: false }
  }
]
