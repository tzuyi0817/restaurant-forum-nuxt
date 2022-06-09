<template>
  <div class="container py-5">
    <NavTabs />
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
      <h3 v-show="!restaurants.length">此類別暫無資料</h3>
    </div>

    <RestaurantsPagination
      v-if="totalPage > 1"
      :category-id="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavTabs from "@/components/NavTabs.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import RestaurantsNavPills from "@/components/RestaurantsNavPills.vue";
import RestaurantsPagination from "@/components/RestaurantsPagination.vue";
import restaurantAPI from "@/api/restaurants";
import type { Restaurant } from '@/types/restaurant';
import type { Category } from '@/types/category';

export default Vue.extend({
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data() {
    return {
      restaurants: [] as Array<Restaurant>,
      categories: [] as Array<Category>,
      categoryId: -1,
      currentPage: 1,
      totalPage: -1
    };
  },
  async fetch() {
    try {
      const { page, categoryId } = this.$route.query;
      const { data, statusText } = await restaurantAPI.getRestaurants({
        page: (page as string) ?? "1",
        categoryId: (categoryId as string) ?? ""
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.restaurants = data.restaurants;
      this.categories = data.categories;
      this.categoryId = data.categoryId;
      this.currentPage = data.page;
      this.totalPage = data.totalPage.length;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
});
</script>

<style lang="scss" scoped>
h3 {
  width: 100%;
  text-align: center;
  line-height: 200px;
}
</style>