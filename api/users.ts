import { $axios } from '@/assets/utils/externalModule';
import type { UserId, RestaurantId } from '@/types/ajaxPayload';

export default {
  getCurrentUser() {
    return $axios.get(`/get_current_user`);
  },
  get({ userId }: UserId) {
    return $axios.get(`/users/${userId}`);
  },
  getUsersTop() {
    return $axios.get('/users/top');
  },
  addFavorite({ restaurantId }: RestaurantId) {
    return $axios.post(`/favorite/${restaurantId}`, null);
  },
  deleteFavorite({ restaurantId }: RestaurantId) {
    return $axios.delete(`/favorite/${restaurantId}`);
  },
  addLike({ restaurantId }: RestaurantId) {
    return $axios.post(`/like/${restaurantId}`, null);
  },
  deleteLike({ restaurantId }: RestaurantId) {
    return $axios.delete(`/like/${restaurantId}`);
  },
  addFollowing({ userId }: UserId) {
    return $axios.post(`/following/${userId}`, null);
  },
  deleteFollowing({ userId }: UserId) {
    return $axios.delete(`/following/${userId}`);
  }
}