import { routes as app } from '../app';

const root = [
  { path: '/', redirect: '/tasks' },
];

export default [...root, ...app];
