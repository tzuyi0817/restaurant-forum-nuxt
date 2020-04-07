import { apiHelper } from "../plugins/axios";

export default {
  restaurant: {
    get() {
      return apiHelper.get("/admin/restaurants");
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`);
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`);
    }
  }
};
