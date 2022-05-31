export default interface State {
  currentUser: {
    id?: number,
    name?: string,
    email?: string,
    image?: string,
    isAdmin?: boolean
  },
  isAuthenticated: boolean,
}