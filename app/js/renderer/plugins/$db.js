const ipc = require('electron').ipcRenderer;

const methods = {};

[
  'getPrograms',
  'setPrograms'
].forEach(function (name) {
  methods[name] = function (data) {
    ipc.send(name, data);
  };
});

export default {
  install(Vue){
    Vue.prototype.$db = new Vue({
      methods
    });
  }
}
