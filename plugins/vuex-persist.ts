import VuexPersistence from 'vuex-persist';
import type { Plugin } from '@nuxt/types';
import type RootState from '@/types/store';
import type { Store } from 'vuex';

interface MyWindow extends Window {
  onNuxtReady(obj: object): void
};
declare var window: MyWindow;

const myPlugin: Plugin = ({ store }) => {
  window.onNuxtReady(() => {
    initFromCookies(store);
    new VuexPersistence({
      storage: window.localStorage,
      reducer: (state: RootState) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      })
    }).plugin(store);
  });
};

async function initFromCookies({ state, commit }: Store<any>) {
  await Promise.resolve();
  state.currentUser.name && commit('setCurrentUser', state.currentUser);
}

export default myPlugin;