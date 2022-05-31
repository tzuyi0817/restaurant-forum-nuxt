import type { MutationTree } from 'vuex';
import type RootState from '@/types/store';
import { $cookies } from '@/assets/utils/externalModule';

const mutations: MutationTree<RootState> = {
  setCurrentUser(state, currentUser) {
    state.currentUser = {
      ...state.currentUser,
      ...currentUser
    };
    state.isAuthenticated = true;
    $cookies.set('userId', currentUser.id);
  },
  revokeAuthentication(state) {
    state.currentUser = {};
    state.isAuthenticated = false;
    $cookies.remove('token');
    $cookies.remove('userId');
  }
};

export default mutations;