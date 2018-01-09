import * as types from './mutation-types';
import event from '../event';

export default {
  [types.UPDATE_SETTINGS](state, data){
    state.data = data;
    event.$emit('settingsUpdated', state.data);
  }
}
