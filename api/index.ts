import { NuxtAxiosInstance } from '@nuxtjs/axios';

export let $axios: NuxtAxiosInstance;

export function initAxios(axios: NuxtAxiosInstance) {
  $axios = axios;
}
