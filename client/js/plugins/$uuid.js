import uuid from '../helpers/uuid';

export default {
  install (Vue) {
    Vue.prototype.$_uuid = uuid;
  }
}
