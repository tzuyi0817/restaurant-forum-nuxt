import axios from 'axios'

const baseURL = 'https://forum-express-api.herokuapp.com/api'

export const apiHelper = axios.create({
  baseURL
})