const methods = {
  onChange(string, value, fn = ()=>{}){
    let handleString = new Function('value', `this.${string} = value`);
    handleString.call(this, value);
    fn(value);
    return this;
  },
  openDialog(name, fn = ()=>{}){
    (new Function(`this.${name} = true;`)).call(this);
    fn();
    return this;
  },
  closeDialog(name, fn = ()=>{}){
    (new Function(`this.${name} = false;`)).call(this);
    fn();
    return this;
  }
};

export default {
  install(Vue){
    Object.keys(methods).forEach(function (key) {
      Vue.prototype[key] = methods[key];
    });
  }
}
