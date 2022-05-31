import { $axios } from '@/assets/utils/externalModule';

export default {
  getCurrentUser() {
    return $axios.get(`/get_current_user`);
  },
  get({ userId }) {
    return $axios.get(`/users/${userId}`);
  },
  getUsersTop() {
    return $axios.get('/users/top');
  },
  addFavorite({ restaurantId }) {
    return $axios.post(`/favorite/${restaurantId}`, null);
  },
  deleteFavorite({ restaurantId }) {
    return $axios.delete(`/favorite/${restaurantId}`);
  },
  addLike({ restaurantId }) {
    return $axios.post(`/like/${restaurantId}`, null);
  },
  deleteLike({ restaurantId }) {
    return $axios.delete(`/like/${restaurantId}`);
  },
  addFollowing({ userId }) {
    return $axios.post(`/following/${userId}`, null);
  },
  deleteFollowing({ userId }) {
    return $axios.delete(`/following/${userId}`);
  }
}