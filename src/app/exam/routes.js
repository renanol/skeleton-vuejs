import Main from './components/Main';

export default [
  {
    path: '/exam/:id',
    component: Main,
    name: 'exam.main',
    meta: { requiresAuth: true },
  },
];
