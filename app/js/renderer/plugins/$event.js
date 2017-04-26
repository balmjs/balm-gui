import _event from '../store/event';

export default {
  install(Vue){
    Vue.prototype.$_event = _event;
  }
}
