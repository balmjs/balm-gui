import event from '../store/event';
import {appSubscribes} from '../store/state';

const ipc = require('electron').ipcRenderer;

export default {
  install(Vue){

    appSubscribes.forEach(function (name) {
      ipc.on(name, function (e, arg) {
        event.$emit(name, arg, e);
      });
    });

    Vue.prototype.$ipc = ipc;
  }
}
