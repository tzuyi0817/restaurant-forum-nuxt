<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
  </div>
</template>

<script>
import NavTabs from "../../components/NavTabs";
import RestaurantCard from "../../components/RestaurantCard";
import restaurantAPI from "../../api/restaurants";

export default {
  components: {
    NavTabs,
    RestaurantCard
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: -1
    };
  },
  async asyncData() {
    const { data } = await restaurantAPI.getRestaurants();

    return {
      restaurants: data.restaurants,
      categories: data.categories,
      categoryId: data.categoryId,
      currentPage: data.page,
      totalPage: data.totalPage.length
    };
  }
};
</script>