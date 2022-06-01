import { $axios } from '@/assets/utils/externalModule';
import type { SignIn, SignUp } from '@/types/ajaxPayload';

export default {
  signIn(data: SignIn) {
    return $axios.post('/signin', data);
  },
  signUp(data: SignUp) {
    return $axios.post('/signup', data);
  }
}