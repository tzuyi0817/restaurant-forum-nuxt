// import user from './user';
import VuexPersistence from 'vuex-persist'

export const state = () => ({
  currentUser: {
    id: -1,
    name: '',
    email: '',
    image: '',
    isAdmin: false
  },
  isAuthenticated: false,
  token: ''
});

export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = {
      ...state.currentUser,
      // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
      ...currentUser
    }
    state.isAuthenticated = true
    state.token = localStorage.getItem('token')
  },
  revokeAuthentication(state) {
    state.currentUser = {}
    state.isAuthenticated = false
    state.token = ''
    localStorage.removeItem('token')
  }
};

export const actions = {};

export const plugins = [new VuexPersistence().plugin]

// export const modules = {
//   user
// }

