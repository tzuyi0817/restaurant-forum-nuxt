<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage > 1"
      :category-id="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
    />
  </div>
</template>

<script>
import NavTabs from "../../components/NavTabs";
import RestaurantCard from "../../components/RestaurantCard";
import RestaurantsNavPills from "../../components/RestaurantsNavPills";
import RestaurantsPagination from "../../components/RestaurantsPagination";
import restaurantAPI from "../../api/restaurants";
import { Toast } from "../../plugins/sweetalert2";

export default {
  watchQuery: ["page", "categoryId"],
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
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
  async asyncData({ query }) {
    try {
      const { data, statusText } = await restaurantAPI.getRestaurants({
        page: query.page || 1,
        categoryId: query.categoryId || ""
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        restaurants: data.restaurants,
        categories: data.categories,
        categoryId: data.categoryId,
        currentPage: data.page,
        totalPage: data.totalPage.length
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  }
};
</script>