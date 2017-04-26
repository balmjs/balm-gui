const handlers = {
  error(err){
    err && this.$dialog.showMessageBox({message: err});
  },
  execOnError (err){
    err && this.$dialog.showMessageBox({message: err});
  },
  getProgramsError(err){
    err && this.$dialog.showMessageBox({message: err});
  },
  setProgramsError(err){
    err && this.$dialog.showMessageBox({message: err});
  }
};

export default {
  created (){
    let self = this;
    this.$store.state.appSubscribes.forEach((name)=>{
      this.$_event.$on(name, function (){
        handlers[name] && handlers[name].apply(self, arguments);
      });
    });
  }
}
