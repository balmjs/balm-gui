import state from './state';
import actions from './actions';
import mutations from './mutations';

import programs from './programs';
import settings from './settings';

export default {
  state,
  actions,
  mutations,
  modules: {
    programs,
    settings
  }
};
