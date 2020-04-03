<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :restaurant="restaurant" :is-favorited="isFavorited" :is-liked="isLiked" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <!-- 新增評論 CreateComment -->
  </div>
</template>

<script>
import RestaurantDetail from "../../components/RestaurantDetail";
import restaurantAPI from "../../api/restaurants";
import { Toast } from "../../plugins/sweetalert2";

export default {
  components: {
    RestaurantDetail
  },
  data() {
    return {
      restaurant: {},
      comments: [],
      isFavorited: false,
      isLiked: false
    };
  },
  async asyncData({ params }) {
    try {
      const { data, statusText } = await restaurantAPI.getRestaurant({
        restaurantId: params.id
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        restaurant: {
          ...data.restaurant
        },
        comments: data.restaurant.Comments,
        isFavorited: data.isFavorited,
        isLiked: data.isLiked
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