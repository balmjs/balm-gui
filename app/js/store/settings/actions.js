import * as types from './mutation-types';

export default {
  updateSettings({commit}, data){
    commit(types.UPDATE_SETTINGS, data);
  }
}
