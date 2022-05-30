import { NuxtAxiosInstance } from '@nuxtjs/axios';

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module '@nuxt/types' {
  interface Context {
    readonly $axios: NuxtAxiosInstance
  }

  interface NuxtAppOptions {
    readonly $OneSignal: any
  }

  interface NuxtOptions {
    OneSignal?: any
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    readonly $OneSignal: any
  }
}
