import event from '../store/event';

const ipc = require('electron').ipcRenderer;

export default {
  install(Vue){

    [
      'error',
      'startExec',
      'endExec',
      'execOnData',
      'execOnError',
      'execOnClose',
      'execOnEnd',
      'getProgramsDone',
      'getProgramsError',
      'setProgramsSuccess',
      'setProgramsError'
    ].forEach(function (name) {
      ipc.on(name, function (e, arg) {
        event.$emit(name, arg, e);
      });
    });

    Vue.prototype.$ipc = ipc;
  }
}
