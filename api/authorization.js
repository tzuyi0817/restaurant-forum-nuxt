import { apiHelper } from '../plugins/axios'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}