import { apiHelper } from "../plugins/axios";

export default {
  restaurant: {
    get() {
      return apiHelper.get("/admin/restaurants");
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`);
    },
    create({ formData }) {
      return apiHelper.post("/admin/restaurants", formData);
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`);
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData);
    }
  },
  categories: {
    get() {
      return apiHelper.get("/admin/categories");
    },
    create({ name }) {
      return apiHelper.post("/admin/categories", { name });
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name });
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`);
    }
  }
};
