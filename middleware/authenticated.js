export default function ({ store, redirect, $toast }) {
  if (store.state.isAuthenticated === false) {
    $toast.fire({
      icon: "error",
      title: "請先登入帳號"
    });
    return redirect('/signIn');
  }
}