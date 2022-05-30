import { initAxios } from "@/api";
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default ({ $axios }: { $axios: NuxtAxiosInstance }) => {
  $axios.setBaseURL('https://forum-express-api.herokuapp.com/api');
  $axios.onRequest(config => {
    const token = localStorage.getItem('token');

    token && $axios.setHeader('Authorization', `Bearer ${token}`);
    return config;
  });

  $axios.onError(error => Promise.reject(error));
  initAxios($axios);
}
