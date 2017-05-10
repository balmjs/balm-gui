export default {
  install(Vue){

    Vue.prototype.$debugger = process.env.NODE_ENV === 'development' ? new Vue({
      el: document.createElement('div'),
      template: `<div class="balm-gui-debugger-bar"><span @click="toggleDevTools">toggle dev tools</span></div>`,
      methods: {
        toggleDevTools(){
          this.$ipc.send('toggleDevTools');
        }
      },
      mounted(){
        document.body.appendChild(this.$el);
      }
    }) : null;
  }
}
