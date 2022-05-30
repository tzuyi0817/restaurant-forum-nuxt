export default interface Store {
  currentUser: {
    id: number,
    name: string,
    email: string,
    image: string,
    isAdmin: boolean
  },
  isAuthenticated: boolean,
  token: string
}