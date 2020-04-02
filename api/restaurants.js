import { apiHelper } from '../plugins/axios'

export default {
  getRestaurants() {
    return apiHelper.get('/restaurants')
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
}