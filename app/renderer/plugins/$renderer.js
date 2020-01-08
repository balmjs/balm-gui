import electron from 'electron';

export default {
  install(Vue) {
    Object.keys(electron).forEach(key => {
      Vue.prototype[`$_${key}`] = electron[key];
    });
  }
};
