import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  if (process.browser) {
    window.onNuxtReady(() => {
      new VuexPersistence({
        /* your options */
      }).plugin(store);
    });
  }
}