import {mapActions} from 'vuex';

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
  data(){
    return {
      firstLoad: false
    }
  },
  created (){
    let self = this;
    this.$store.state.appSubscribes.forEach((name)=>{
      this.$_event.$on(name, function (){
        handlers[name] && handlers[name].apply(self, arguments);
      });
    });

    // TODO: 获取项目列表和配置数据，存于store中
    this.$_event.$on('getProgramsDone', (data)=>{
      this.updatePrograms(data || []);
    });

    this.$_event.$on('programsUpdated', (list)=>{
      if(this.firstLoad){
        this.$db.setPrograms(list);
      } else {
        this.firstLoad = true
      }
    });

    this.$db.getPrograms();
  },
  methods: {
    ...mapActions([
      'updatePrograms'
    ])
  }
}