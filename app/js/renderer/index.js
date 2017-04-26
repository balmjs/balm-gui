import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import BalmUI from 'balm-ui';

// 程序构成
import App from './app';
import routes from './routers';
import store from './store';
import _event from './store/event'

// 自定义插件
import $ipc from './plugins/$ipc';
import $input from './plugins/$input';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BalmUI);
Vue.use($ipc);
Vue.use($input);

Vue.prototype.$_event = _event;
Vue.prototype.isDev = process.env.NODE_ENV === 'development';

const router = new VueRouter({
  routes
});

let app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store: new Vuex.Store(store)
});


