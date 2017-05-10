import Home from '../views/index';
import Add from '../views/add/index';

export default [{ // 首页
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    className: ['homepage']
  }
}, { // 各种新增
  path: '/add/:action?',
  name: 'add',
  component: Add,
  meta: {
    className: ['add-something']
  }
}];
