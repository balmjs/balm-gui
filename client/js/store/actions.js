import * as types from './mutation-types';

export default {
  updatePath({commit}, data){
    commit(types.UPDATE_PATH, data);
  }
}
