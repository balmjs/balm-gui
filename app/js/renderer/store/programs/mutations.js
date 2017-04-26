import * as type from './mutation-types';

export default {
  [type.SET_PROGRAMS](state, data){
    state.list = data;
  }
}
