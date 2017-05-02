const methods = {
  runDev(item){
    item.onDev = true;
    this.$ipc.send('runDev', item);
  },
  stopDev(item){
    item.onDev = false;
    this.$ipc.send('stopDev', item);
  },
  build(item){
    this.stopDev(item);
    item.onProd = true;
    this.$ipc.send('buildProgram', item);
  },
  getConfigPath(item){
    // TODO: should find config file, according to program's PATH and TEMPLATE props.
  }
};

const created = function () {
  // TODO: callback of after build, init or dev.
};

export default {
  install(Vue){
    Vue.prototype.$devManager = new Vue({
      methods
    });
  }
}
