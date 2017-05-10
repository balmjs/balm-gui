import helpers from '../helpers';

export default {
  install(Vue){
    Object.keys(helpers).forEach((method)=>{
      Vue.prototype[`$_${method}`] = helpers[method];
    });
  }
}
