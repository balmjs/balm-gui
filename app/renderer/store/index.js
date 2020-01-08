import Vue from 'vue';

import base from './models/base';
import dev from './models/dev';

const isDev = process.env.NODE_ENV === 'development';

export default new Vue({
  name: 'store',
  mixins: [base, isDev ? dev : {}],
  data() {
    return {
      isDev
    };
  }
});
