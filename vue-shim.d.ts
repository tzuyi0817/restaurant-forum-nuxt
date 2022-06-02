import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type { NuxtCookies } from 'cookie-universal-nuxt';
import type Swal from 'sweetalert2';

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $axios: NuxtAxiosInstance
    readonly $cookies: NuxtCookies
    readonly $toast: Swal
  }
}

declare module '@nuxt/types' {
  interface Context {
    readonly $axios: NuxtAxiosInstance
    readonly $cookies: NuxtCookies
    readonly $toast: Swal
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    readonly $OneSignal: any
  }
}
