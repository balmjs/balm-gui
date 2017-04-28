import * as types from './mutation-types';
import event from '../event';

export default {
  updatePrograms({commit}, data){
    commit(types.SET_PROGRAMS, data);
    event.$emit('programsUpdated', data);
  }
}
