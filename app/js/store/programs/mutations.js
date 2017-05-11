import * as types from './mutation-types';
import event from '../event';

export default {
  [types.SET_PROGRAMS](state, data){
    state.list = data;
    event.$emit('programsUpdated', state.list);
  },
  [types.SET_SINGLE_PROGRAM](state, item){
    let index = state.list.findIndex( ({id})=> id === item.id);
    state.list.splice(index, 1, item);
    event.$emit('programsUpdated', state.list);
  },
  [types.REMOVE_PROGRAM](state, item){
    let index = state.list.findIndex( ({id})=> id === item.id);
    state.list.splice(index, 1);
    event.$emit('programsUpdated', state.list);
  }
}
