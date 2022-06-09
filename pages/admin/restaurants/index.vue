<template>
  <div class="container py-5">
    <AdminNav />

    <nuxt-link
      :to="{ name: 'admin-restaurants-new' }"
      class="btn btn-primary mb-4"
    >
      New Restaurant
    </nuxt-link>

    <AdminRestaurantsTable :restaurants="restaurants" @update-restaurants="updateRestaurants" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminNav from "@/components/AdminNav.vue";
import AdminRestaurantsTable from "@/components/AdminRestaurantsTable.vue";
import adminRestaurantAPI from "@/api/admin";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  components: {
    AdminNav,
    AdminRestaurantsTable
  },
  data() {
    return {
      restaurants: [] as Array<Restaurant>
    };
  },
  async fetch() {
    try {
      const { data, statusText } = await adminRestaurantAPI.restaurant.get();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.restaurants = data.restaurants;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後在試"
      });
    }
  },
  methods: {
    updateRestaurants(restaurantId: number) {
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id !== restaurantId
      );
    }
  }
});
</script>
