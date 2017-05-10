export default {
  install(Vue){
    Vue.prototype.$win = require('electron').remote.BrowserWindow;
  }
}
