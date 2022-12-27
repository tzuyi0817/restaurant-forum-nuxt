<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div class="card mb-3">
      <div class="row no-gutters" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="col-md-4">
          <nuxt-link :to="{name: 'restaurants-id', params: { id: restaurant.id }}">
            <img class="card-img" :src="restaurant.image || require('~/assets/images/noImage.png')" />
          </nuxt-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
            <p class="card-text">{{ restaurant.description }}</p>
            <nuxt-link
              :to="{name: 'restaurants-id', params: { id: restaurant.id }}"
              class="btn btn-primary mr-2"
            >Show</nuxt-link>

            <button
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger mr-2"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              :disabled="isProcessing"
            >移除最愛</button>

            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFavorite(restaurant.id)"
              :disabled="isProcessing"
            >加到最愛</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavTabs from "@/components/NavTabs.vue";
import restaurantAPI from "@/api/restaurants";
import userAPI from "@/api/users";
import type { Restaurant } from '@/types/restaurant';

type UpdateRestaurantsArgs = {
  favorite: boolean;
  restaurantId: number;
};

export default Vue.extend({
  components: {
    NavTabs
  },
  data() {
    return {
      restaurants: [] as Array<Restaurant>,
      isProcessing: false
    };
  },
  async fetch() {
    try {
      const { data, statusText } = await restaurantAPI.getTop();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.restaurants = data.restaurants
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async deleteFavorite(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.deleteFavorite({ restaurantId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.updateRestaurants({ favorite: false, restaurantId });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法將餐廳從最愛移除，請稍後再試"
        });
      }
    },
    async addFavorite(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.addFavorite({ restaurantId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.updateRestaurants({ favorite: true, restaurantId });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試"
        });
      }
    },
    updateRestaurants({ favorite, restaurantId }: UpdateRestaurantsArgs) {
      const restaurant = this.restaurants.find(restaurant => restaurant.id === restaurantId);
      if (restaurant === void 0) return;
  
      restaurant.FavoriteCount = restaurant.FavoriteCount + (favorite ? 1 : -1);
      restaurant.isFavorited = favorite;
      this.restaurants.sort((a, b) => b.FavoriteCount - a.FavoriteCount);
    },
  }
});
</script>

<style lang="scss" scoped>
.card {
  max-width: 540px;
  margin: auto;
}
</style>