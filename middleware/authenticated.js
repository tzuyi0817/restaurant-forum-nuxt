export default function ({ store, redirect }) {
  if (store.state.isAuthenticated === false) {
    return redirect('/signIn')
  }
}