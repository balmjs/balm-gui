import * as types from './mutation-types';

export default {
  updatePrograms({commit}, data){
    commit(types.SET_PROGRAMS, data);
  },
  updateProgram({commit}, item){
    commit(types.SET_SINGLE_PROGRAM, item);
  },
  removeProgram({commit}, item){
    commit(types.REMOVE_PROGRAM, item);
  }
}
