export default function ({ store, redirect }) {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.isAdmin === false) {
    return redirect('/restaurants')
  }
}