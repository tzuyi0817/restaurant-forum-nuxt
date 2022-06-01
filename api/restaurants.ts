import { $axios } from '@/assets/utils/externalModule';
import type { RestaurantId, QueryRestaurants } from '@/types/ajaxPayload';

export default {
  getRestaurants({ page, categoryId }: QueryRestaurants) {
    const searchParams = new URLSearchParams({ page, categoryId });
    return $axios.get(`/restaurants?${searchParams.toString()}`);
  },
  getRestaurant({ restaurantId }: RestaurantId) {
    return $axios.get(`/restaurants/${restaurantId}`);
  },
  getFeeds() {
    return $axios.get('/restaurants/feeds');
  },
  getTop() {
    return $axios.get('/restaurants/top');
  },
  getDashboard({ restaurantId }: RestaurantId) {
    return $axios.get(`/restaurants/${restaurantId}/dashboard`);
  }
}