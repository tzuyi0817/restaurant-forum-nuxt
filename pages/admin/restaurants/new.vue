<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :categories="categories"
      @after-submit="afterSubmit"
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
      const { data, statusText } = await adminAPI.categories.get();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.categories = data.categories;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async afterSubmit(formData: FormData) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.restaurant.create({
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$toast.fire({
          icon: "success",
          title: "餐廳已成功建立"
        });
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = true;
        this.$toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試"
        });
      }
    }
  }
});
</script>
