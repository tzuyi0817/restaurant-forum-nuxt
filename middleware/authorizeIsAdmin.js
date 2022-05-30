export default function ({ store, redirect }) {
  const { currentUser } = store.state;
  if (currentUser?.isAdmin === false) {
    $toast.fire({
      icon: "error",
      title: "帳號權限不符"
    });
    return redirect('/restaurants');
  }
}