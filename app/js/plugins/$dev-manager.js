import _event from '../store/event';
import {exec} from 'child_process';
import {existsSync} from 'fs';
import type from '../helpers/type';

const checkPath = function ({path}, fn) {
  if(existsSync(path)){
    type.isFunction(fn) && fn();
  } else {
    this.$dialog.showMessageBox({
      type: 'error',
      message: `can not find program on '${path}'`
    });
  }
};

const methods = {
  runDev(item){
    checkPath.call(this, item, ()=>{
      this.$terminal.open();
      item.onRunDev = true;
      let oldLs = this.lsArr.find((o)=> o.id === item.id);
      let ls = exec(`npm run dev`, {
        cwd: item.path
      });

      if(oldLs){
        oldLs.ls.kill();
        oldLs.ls = ls;
      } else {
        this.lsArr.push({
          id: item.id,
          ls
        });
      }

      ls.stdout.on('data', (data)=>{
        _event.$emit('devOutput', data);
      });

      ls.stderr.on('data', (data)=>{
        _event.$emit('devError', data);
      });

      ls.on('close', ()=>{
        _event.$emit('devClosed', item);
      });
    });
  },
  stopDev(item){
    item.onRunDev = false;
    let index = this.lsArr.findIndex((o)=> o.id = item.id), oldLs = this.lsArr[index];

    if(oldLs){
      oldLs.ls.kill();
      this.lsArr.splice(index, 1);
    }

    _event.$emit('stopDevServer', item.id);
  },
  build(item){
    checkPath.call(this, item, ()=>{
      this.stopDev(item);
      item.onRunProd = true;

      let ls = exec(`npm run prod`, {
        cwd: item.path
      });

      _event.$emit('startProd', item);

      ls.stdout.on('data', (data)=>{
        _event.$emit('prodOutput', data);
      });

      ls.stderr.on('data', (data)=>{
        _event.$emit('prodError', data);
      });

      ls.on('close', ()=>{
        _event.$emit('prodCompleted', item);
      });
    });
  },
  getConfigPath(item){
    // TODO: should find config file, according to program's PATH and TEMPLATE props.
  }
};

const created = function () {
  _event.$on('startDev', ()=>{
    this.$terminal.insertText('start open devServer... ');
  });

  _event.$on('devOutput', (data)=>{
    this.$terminal.insertText(data);
  });

  _event.$on('devClosed', ()=>{
    this.$terminal.insertText('devServer has been stopped.');
  });

  _event.$on('startProd', ()=>{
    this.$terminal.insertText('start build program... ');
  });

  _event.$on('prodOutput', (data)=>{
    this.$terminal.insertText(data);
  });
};

const data = function () {
  return {
    lsArr: []
  }
};

export default {
  install(Vue){
    Vue.prototype.$devManager = new Vue({
      data,
      methods,
      created
    });
  }
}
