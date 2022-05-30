import { $axios } from "@/api";

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });
    return $axios.get(`/restaurants?${searchParams.toString()}`);
  },
  getRestaurant({ restaurantId }) {
    return $axios.get(`/restaurants/${restaurantId}`);
  },
  getFeeds() {
    return $axios.get('/restaurants/feeds');
  },
  getTop() {
    return $axios.get('/restaurants/top');
  },
  getDashboard({ restaurantId }) {
    return $axios.get(`/restaurants/${restaurantId}/dashboard`);
  }
}