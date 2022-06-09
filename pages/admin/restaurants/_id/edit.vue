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

<script lang="ts">
import Vue from 'vue';
import AdminRestaurantForm from "@/components/AdminRestaurantForm.vue";
import adminAPI from "@/api/admin";
import type { Restaurant } from '@/types/restaurant';
import type { Category } from '@/types/category';

export default Vue.extend({
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {} as Restaurant,
      categories: [] as Array<Category>,
      isProcessing: false
    };
  },
  async fetch() {
    try {
      const { id: restaurantId } = this.$route.params;
      const [categoriesResponse, restaurantResponse] = await Promise.all([
        adminAPI.categories.get(),
        adminAPI.restaurant.getDetail({ restaurantId: +restaurantId }),
      ]);

      if (categoriesResponse.statusText !== "OK" || restaurantResponse.statusText !== "OK") {
        throw new Error('Error');
      }

      this.categories = categoriesResponse.data.categories;
      this.restaurant = restaurantResponse.data.restaurant;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async handleAfterSubmit(formData: FormData) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.restaurant.update({
          restaurantId: this.restaurant.id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$toast.fire({
          icon: "success",
          title: "已成功更新餐廳資料"
        });
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法更新餐廳資料，請稍後再試"
        });
      }
    }
  }
});
</script>
