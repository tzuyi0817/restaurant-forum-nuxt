// import axios from 'axios'

// const baseURL = 'https://forum-express-api.herokuapp.com/api'

// export const axiosInstance = axios.create({
//   baseURL
// })

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   err => Promise.reject(err)
// )

// export const apiHelper = axiosInstance