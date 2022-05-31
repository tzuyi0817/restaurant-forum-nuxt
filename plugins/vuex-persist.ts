import VuexPersistence from 'vuex-persist';
import type { Plugin } from '@nuxt/types';
import type Store from '@/types/store';

interface MyWindow extends Window {
  onNuxtReady(obj: object): void
};
declare var window: MyWindow;

const myPlugin: Plugin = ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: window.localStorage,
      reducer: (state: Store) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      })
    }).plugin(store);
  });
};

export default myPlugin;