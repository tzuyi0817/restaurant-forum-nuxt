<template>
  <div class="container py-5">
    <div class="col-md-12">
      <h1>{{ restaurant.name }}</h1>
      <p>[{{ restaurant.Category && restaurant.Category.name }}]</p>
    </div>

    <br />
    <br />

    <div class="dashboard">
      <ul class="list-dashboard">
        <li>
          <strong>評論數 :</strong>
          {{ restaurant.Comments && restaurant.Comments.length }}
        </li>
        <li>
          <strong>瀏覽次數 :</strong>
          {{ restaurant.viewCounts }}
        </li>
      </ul>
    </div>

    <br />
    <br />
    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import restaurantAPI from "@/api/restaurants";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  data() {
    return {
      restaurant: {} as Restaurant
    };
  },
  async fetch() {
    try {
      const { id: restaurantId } = this.$route.params;
      const { data, statusText } = await restaurantAPI.getDashboard({
        restaurantId: +restaurantId
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.restaurant = data.restaurant
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  }
});
</script>