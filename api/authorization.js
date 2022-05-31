import { $axios } from '@/assets/utils/externalModule';

export default {
  signIn({ email, password }) {
    return $axios.post('/signin', {
      email,
      password
    });
  },
  signUp(data) {
    return $axios.post('/signup', {
      ...data
    });
  }
}