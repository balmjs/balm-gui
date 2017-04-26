import * as types from './mutation-types';

export default {
  updatePrograms({commit}, data){
    commit(types.SET_PROGRAMS, data);
  }
}
