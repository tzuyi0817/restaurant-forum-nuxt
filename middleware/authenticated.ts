import type { Plugin } from '@nuxt/types';

const myPlugin: Plugin = ({ store, redirect, $toast, route }) => {
  const { name } = route;
  const needlessAuth = ['signIn', 'signUp'];
  if (needlessAuth.includes(name ?? '')) return;
  if (store.state.isAuthenticated === false) {
    $toast.fire({
      icon: "error",
      title: "請先登入帳號"
    });
    return redirect('/signin');
  }
};

export default myPlugin;
