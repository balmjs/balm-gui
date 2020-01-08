import 'normalize.css';
import Vue from 'vue';
import App from '@/views/layouts/app';
import router from '@/routes';

import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';

import $store from '@/plugins/$store';
import $renderer from '@/plugins/$renderer';

Vue.config.productionTip = false;
Vue.use(BalmUI);
Vue.use(BalmUIPlus);

Vue.use($store);
Vue.use($renderer);

new Vue({
  el: '#app',
  components: { App },
  template: '<app/>',
  router
});
