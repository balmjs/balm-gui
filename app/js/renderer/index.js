import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import BalmUI from 'balm-ui';

// 程序构成
import App from './app';
import routes from './routers';
import store from './store';
import bootstrap from './mixins/bootstrap';

// 自定义插件
import $ipc from './plugins/$ipc';
import $input from './plugins/$input';
import $db from './plugins/$db';
import $helper from './plugins/$helper';
import $event from './plugins/$event';
import $moment from './plugins/$moment';
import $dialog from './plugins/$dialog';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BalmUI);
Vue.use($ipc);
Vue.use($input);
Vue.use($db);
Vue.use($helper);
Vue.use($event);
Vue.use($moment);
Vue.use($dialog);

Vue.prototype.isDev = process.env.NODE_ENV === 'development';

const router = new VueRouter({
  routes
});

let app = new Vue({
  mixins: [bootstrap],
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store: new Vuex.Store(store)
});


