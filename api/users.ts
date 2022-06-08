import { $axios } from '@/assets/utils/externalModule';
import type { UserId, RestaurantId, UpdateUser } from '@/types/ajaxPayload';

export default {
  get({ userId }: UserId) {
    return $axios.get(`/users/${userId}`);
  },
  update({ userId, formData }: UpdateUser) {
    return $axios.put(`/users/${userId}`, formData);
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