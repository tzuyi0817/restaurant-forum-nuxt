import type { Plugin } from '@nuxt/types';

const myPlugin: Plugin = ({ store, redirect, $toast }) => {
  if (store.state.isAuthenticated === false) {
    $toast.fire({
      icon: "error",
      title: "請先登入帳號"
    });
    return redirect('/signIn');
  }
};

export default myPlugin;
