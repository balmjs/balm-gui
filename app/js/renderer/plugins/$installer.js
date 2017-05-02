import fs from 'fs';
import {mapState, mapActions} from 'vuex';
import _event from '../store/event';
import Vuex from 'vuex';
import store from '../store';

// this.$win.getAllWindows()[0].setProgressBar(.8)

const methods = {
  ...mapActions([
    'updateProgram'
  ]),
  initProgram({installed, path, tpl, id}){

    if(!installed){

      fs.readdir(path,  (err, files)=> {

        if(files.length){

          this.$dialog.showMessageBox({
            type: 'warning',
            buttons: ['Sure', 'Cancel'],
            message: 'This folder is not empty, the existing files will be covered by installing template.\nDo you want to overwrite?',
            cancelId: 1
          }, (response) => {
            if(response === 0) {
              this.$ipc.send('installTpl', {tpl: this.templates[tpl].value, path, id});
            }
          });

        } else {
          this.$ipc.send('installTpl', {tpl: this.templates[tpl].value, path, id});
        }

      });

    }
  }
};

const computed = {
  ...mapState(['templates']),
  list(){
    return this.$store.state.programs.list;
  }
};

const created = function () {
  _event.$on('startInstallTpl', ()=>{
    this.$terminal.insertText('start installing boilerplate... ');
  });

  _event.$on('startInstallDepend', ()=>{
    this.$terminal.insertText('start installing dependencies... ');
  });

  _event.$on('tplInstallIng', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('tplInstallCompleted', (config)=>{
    this.$ipc.send('installDepend', config);
  });

  _event.$on('dependInstallIng', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('dependInstallCompleted', ({id})=>{

    let item = this.$_copy(this.list.find((item)=> item.id === id));
    item.installed = true;

    this.updateProgram(item);

    this.$terminal.close();
  });

};

const data = function () {
  return {};
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
