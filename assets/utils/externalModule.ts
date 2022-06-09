import type { Context, NuxtOptions, NuxtAppOptions } from '@nuxt/types';
import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type { NuxtCookies, GetOptions } from 'cookie-universal-nuxt';

export let store: Context['store'];
export let router: NuxtAppOptions['router'];
export let headers: Context['req']['headers'];
export let $axios: NuxtAxiosInstance;
export let $config: NuxtOptions['publicRuntimeConfig'];
export let $cookies: NuxtCookies;

export function init (context: Context) {
  store = context.store;
  router = context.app.router;
  headers = context.req?.headers;
  $axios = context.$axios;
  $config = context.$config;
  $cookies = context.$cookies;
  setCookies();
}

function setCookies () {
  const GET_COOKIE = $cookies.get;

  $cookies.get = function (name: string, opts: GetOptions | undefined) {
    return GET_COOKIE(name, { parseJSON: true, fromRes: true }) ?? GET_COOKIE(name, opts);
  };
}