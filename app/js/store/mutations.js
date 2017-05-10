import * as types from './mutation-types';

export default {
  [types.UPDATE_PATH](state, data){
    state.PATH = data;
  }
}
