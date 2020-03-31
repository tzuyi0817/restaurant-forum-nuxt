import axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = 'https://forum-express-api.herokuapp.com/api'  //设置通用的请求地址
}

export default axios.create(options)