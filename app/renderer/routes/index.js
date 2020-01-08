import Vue from 'vue';
import VueRouter from 'vue-router';

import baseRoutes from './base';

Vue.use(VueRouter);

const routes = baseRoutes.concat([]);

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
