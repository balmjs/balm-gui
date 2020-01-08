const Home = () => import('@/views/home');

export default [
  {
    path: '/home',
    name: 'home',
    component: Home,
    alias: '/'
  }
];
