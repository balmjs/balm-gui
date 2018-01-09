// this.$win.getAllWindows()[0].setProgressBar(.8)
import {readdir, existsSync} from 'fs';
import {mapState, mapActions} from 'vuex';
import _event from '../store/event';
import Vuex from 'vuex';
import store from '../store';

const methods = {
  ...mapActions([
    'updateProgram',
    'removeProgram'
  ]),
  getTplName(tpl){
    return this.templates.find(({key}) => key === tpl).value;
  },
  remove(item){
    this.$dialog.showMessageBox({
      type: 'warning',
      buttons: ['Yes', 'Cancel'],
      message: 'Do you want to remove this program?',
      cancelId: 1
    }, (response) => {
      if(response === 0) {
        this.removeProgram(item);
      }
    });
  },
  initProgram({installed, path, tpl, id}){

    if(existsSync(path)){
      if(!installed){

        readdir(path,  (err, files)=> {

          if(files.length){

            this.$dialog.showMessageBox({
              type: 'warning',
              buttons: ['Sure', 'Cancel'],
              message: 'This folder is not empty, the existing files will be covered by installing template.\nDo you want to overwrite?',
              cancelId: 1
            }, (response) => {
              if(response === 0) {
                this.$ipc.send('installTpl', {tpl: this.getTplName(tpl), path, id});
              }
            });

          } else {
            this.$ipc.send('installTpl', {tpl: this.getTplName(tpl), path, id});
          }

        });
      }
    } else {
      this.$dialog.showMessageBox({
        type: 'error',
        message: `can not find program on '${path}'`
      });
    }
  }
};

const computed = {
  ...mapState([
    'templates',
    'PATH'
  ]),
  list(){
    return this.$store.state.programs.list;
  }
};

const created = function () {
  _event.$on('startInstallTpl', ()=>{
    this.$terminal.open();
    this.$terminal.insertText('start downloading boilerplate... ');
  });

  _event.$on('installTplError', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('tplDownloadFinished', ()=>{
    this.$terminal.insertText('Boilerplate files has been download successful. prepare to install...');
  });

  _event.$on('tplDownloadError', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('tplInstallCompleted', (config)=>{
    this.$ipc.send('installDepend', config);
  });

  _event.$on('startInstallDepend', ()=>{
    this.$terminal.insertText('start installing dependencies... ');
  });

  _event.$on('dependInstalling', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('dependInstallError', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('dependInstallCompleted', ({id})=>{

    // if(!this.InstallDependError){
      let item = this.$_copy(this.list.find((item)=> item.id === id));
      item.installed = true;
      this.updateProgram(item);
      this.$terminal.insertText('Completed! Close this unreal terminal and try to start dev server.');
    // }

  });

};

const data = function () {
  return {
    InstallDependError: false
  }
};

export default {
  install(Vue){
    Vue.prototype.$installer = new Vue({
      data,
      methods,
      computed,
      created,
      store: new Vuex.Store(store)
    });
  }
}
