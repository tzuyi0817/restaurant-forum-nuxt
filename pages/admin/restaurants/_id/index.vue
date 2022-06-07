<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <p>[{{ restaurant.Category.name }}]</p>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="emptyImage(restaurant.image)"
        />
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.opening_hours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr />
    <nuxt-link to="#" @click="$router.back()">回上一頁</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import adminRestaurantAPI from "@/api/admin";
import { emptyImage } from "@/assets/utils/mixins";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  data() {
    return {
      restaurant: {} as Restaurant,
    };
  },
  async fetch() {
    try {
      const { id: restaurantId } = this.$route.params;
      const {
        data,
        statusText
      } = await adminRestaurantAPI.restaurant.getDetail({ restaurantId });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.restaurant = data.restaurant;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  },
  methods: {
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>

<style lang="scss" scoped>
.img-responsive {
  width: 250px;
  margin-bottom: 25px;
}
</style>
