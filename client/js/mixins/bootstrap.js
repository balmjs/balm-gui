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
      programsLoaded: false,
      settingsLoaded: false
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

    this.$_event.$on('getSettingsDone', (data)=>{
      this.updateSettings(data || {});
    });

    this.$_event.$on('programsUpdated', this.saveTpl);

    this.$_event.$on('settingsUpdated', this.saveSettings);

    this.$_event.$on('init', (path)=> {
      this.updatePath(path);
    });

    this.$_event.$on('debug', (e)=> {
      console.log(e);
    });

    this.$db.getPrograms();

    this.$db.getSettings();
  },
  methods: {
    ...mapActions([
      'updatePrograms',
      'updateSettings',
      'updatePath'
    ]),
    saveTpl(list){
      if(this.programsLoaded){
        this.$db.setPrograms(list);
      } else {
        this.programsLoaded = true;
      }
    },
    saveSettings(data){
      if(this.settingsLoaded){
        this.$db.setSettings(data);
      } else {
        this.settingsLoaded = true;
      }
    }
  }
}
