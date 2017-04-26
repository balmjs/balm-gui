export default {
  install(Vue){
    Vue.prototype.$dialog = require('electron').remote.dialog;
  }
}
