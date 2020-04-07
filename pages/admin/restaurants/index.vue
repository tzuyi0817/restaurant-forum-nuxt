<template>
  <div class="container py-5">
    <!-- 後台導覽頁籤 AdminNav -->
    <AdminNav />

    <nuxt-link
      :to="{ name: 'admin-restaurants-new' }"
      class="btn btn-primary mb-4"
    >
      New Restaurant
    </nuxt-link>

    <!-- 後台餐廳列表 AdminRestaurantsTable -->
    <AdminRestaurantsTable :restaurants="restaurants" />
  </div>
</template>

<script>
import AdminNav from "../../../components/AdminNav";
import AdminRestaurantsTable from "../../../components/AdminRestaurantsTable";
import adminRestaurantAPI from "../../../api/admin";
import { Toast } from "../../../plugins/sweetalert2";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  },
  data() {
    return {
      restaurants: []
    };
  },
  async asyncData() {
    try {
      const { data, statusText } = await adminRestaurantAPI.restaurant.get();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        restaurants: data.restaurants
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後在試"
      });
    }
  }
};
</script>
