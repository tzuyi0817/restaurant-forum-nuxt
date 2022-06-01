import type { Plugin } from '@nuxt/types';

const myPlugin: Plugin = ({ store, redirect, $toast }) => {
  const { currentUser } = store.state;
  if (currentUser?.isAdmin === false) {
    $toast.fire({
      icon: "error",
      title: "帳號權限不符"
    });
    return redirect('/restaurants');
  }
};

export default myPlugin;
