<template>
  <div class="container py-5">
    <div class="col-md-12">
      <h1>{{ restaurant.name }}</h1>
      <p>[{{ restaurant.Category.name }}]</p>
    </div>

    <br />
    <br />

    <div class="dashboard">
      <ul class="list-dashboard">
        <li>
          <strong>評論數 :</strong>
          {{restaurant.Comments.length}}
        </li>
        <li>
          <strong>瀏覽次數 :</strong>
          {{restaurant.viewCounts}}
        </li>
      </ul>
    </div>

    <br />
    <br />
    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import restaurantAPI from "../../../api/restaurants";

export default {
  data() {
    return {
      restaurant: {}
    };
  },
  async asyncData({ params }) {
    try {
      const { data, statusText } = await restaurantAPI.getDashboard({
        restaurantId: params.id
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        restaurant: data.restaurant
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