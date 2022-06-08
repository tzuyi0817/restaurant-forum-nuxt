import usersAPI from '@/api/users';
import type RootState from '@/types/store';
import type { ActionTree } from 'vuex';

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch }, { req, query }) {
    await dispatch('fetchCurrentUser');
  },
  async fetchCurrentUser({ commit }) {
    try {
      const userId = this.$cookies.get('userId') ?? -1;
      const { data: { profile }, statusText } = await usersAPI.get({ userId });
      const { id, name, email, image, isAdmin } = profile;
      if (statusText !== 'OK') throw new Error(statusText);
      commit('setCurrentUser', { id, name, email, image, isAdmin });
    } catch (error) {
      commit('revokeAuthentication');
    }
  }
};

export default actions;