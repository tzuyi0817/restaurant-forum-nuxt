import { $axios } from "@/api";

export default {
  restaurant: {
    get() {
      return $axios.get("/admin/restaurants");
    },
    getDetail({ restaurantId }) {
      return $axios.get(`/admin/restaurants/${restaurantId}`);
    },
    create({ formData }) {
      return $axios.post("/admin/restaurants", formData);
    },
    delete({ restaurantId }) {
      return $axios.delete(`/admin/restaurants/${restaurantId}`);
    },
    update({ restaurantId, formData }) {
      return $axios.put(`/admin/restaurants/${restaurantId}`, formData);
    }
  },
  categories: {
    get() {
      return $axios.get("/admin/categories");
    },
    create({ name }) {
      return $axios.post("/admin/categories", { name });
    },
    update({ categoryId, name }) {
      return $axios.put(`/admin/categories/${categoryId}`, { name });
    },
    delete({ categoryId }) {
      return $axios.delete(`/admin/categories/${categoryId}`);
    }
  },
  users: {
    get() {
      return $axios.get("/admin/users");
    },
    update({ userId, isAdmin }) {
      return $axios.put(`/admin/users/${userId}`, { isAdmin });
    }
  }
};
