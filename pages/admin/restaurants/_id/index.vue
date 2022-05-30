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
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        />
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
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
    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import adminRestaurantAPI from "../../../../api/admin";
import { emptyImageFilter } from "../../../../plugins/mixins";

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      restaurant: {}
    };
  },
  async asyncData({ params }) {
    try {
      const {
        data,
        statusText
      } = await adminRestaurantAPI.restaurant.getDetail({
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
