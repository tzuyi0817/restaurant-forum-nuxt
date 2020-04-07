import { apiHelper } from "../plugins/axios";

export default {
  restaurant: {
    get() {
      return apiHelper.get("/admin/restaurants");
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`);
    }
  }
};
