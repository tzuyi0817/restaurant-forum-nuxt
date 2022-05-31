import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { $cookies } from "@/assets/utils/externalModule";

export default ({ $axios }: { $axios: NuxtAxiosInstance }) => {
  $axios.setBaseURL('https://forum-express-api.herokuapp.com/api');
  $axios.onRequest(config => {
    const token = $cookies.get('token');

    token && $axios.setHeader('Authorization', `Bearer ${token}`);
    return config;
  });

  $axios.onError(error => Promise.reject(error));
}
