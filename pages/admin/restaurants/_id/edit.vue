<template>
  <div class="container py-5">
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :categories="categories"
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../../../../components/AdminRestaurantForm";
import adminAPI from "../../../../api/admin";
import { Toast } from "../../../../plugins/sweetalert2";

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {},
      categories: [],
      isProcessing: false
    };
  },
  async asyncData({ params }) {
    try {
      const [categories, restaurant] = await Promise.all([
        adminAPI.categories.get(),
        adminAPI.restaurant.getDetail({
          restaurantId: params.id
        })
      ]);

      if (categories.statusText !== "OK" || restaurant.statusText !== "OK") {
        throw new Error(categories.statusText || restaurant.statusText);
      }

      return {
        categories: categories.data.categories,
        restaurant: restaurant.data.restaurant
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.restaurant.update({
          restaurantId: this.restaurant.id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          icon: "success",
          title: "已成功更新餐廳資料"
        });

        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法更新餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>
