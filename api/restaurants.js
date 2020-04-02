import { apiHelper } from '../plugins/axios'

export default {
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
}