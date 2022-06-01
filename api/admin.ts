import { $axios } from '@/assets/utils/externalModule';
import type {
  RestaurantId,
  Form,
  UpdateRestaurant,
  CategoryId,
  CreateCategory,
  UpdateCategory,
  UpdateAdmin,
} from '@/types/ajaxPayload';

export default {
  restaurant: {
    get() {
      return $axios.get("/admin/restaurants");
    },
    getDetail({ restaurantId }: RestaurantId) {
      return $axios.get(`/admin/restaurants/${restaurantId}`);
    },
    create({ formData }: Form) {
      return $axios.post("/admin/restaurants", formData);
    },
    delete({ restaurantId }: RestaurantId) {
      return $axios.delete(`/admin/restaurants/${restaurantId}`);
    },
    update({ restaurantId, formData }: UpdateRestaurant) {
      return $axios.put(`/admin/restaurants/${restaurantId}`, formData);
    }
  },
  categories: {
    get() {
      return $axios.get("/admin/categories");
    },
    create({ name }: CreateCategory) {
      return $axios.post("/admin/categories", { name });
    },
    update({ categoryId, name }: UpdateCategory) {
      return $axios.put(`/admin/categories/${categoryId}`, { name });
    },
    delete({ categoryId }: CategoryId) {
      return $axios.delete(`/admin/categories/${categoryId}`);
    }
  },
  users: {
    get() {
      return $axios.get("/admin/users");
    },
    update({ userId, isAdmin }: UpdateAdmin) {
      return $axios.put(`/admin/users/${userId}`, { isAdmin });
    }
  }
};
