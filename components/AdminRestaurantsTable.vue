<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category && restaurant.Category.name }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <nuxt-link
            :to="{
              name: 'admin-restaurants-id',
              params: {
                id: restaurant.id
              }
            }"
            class="btn btn-link"
            >Show</nuxt-link
          >

          <nuxt-link
            :to="{
              name: 'admin-restaurants-id-edit',
              params: { id: restaurant.id }
            }"
            class="btn btn-link"
            >Edit</nuxt-link
          >

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            :disabled="isProcessing"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import adminRestaurantAPI from "@/api/admin";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  props: {
    restaurants: {
      type: Array as PropType<Restaurant[]>,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async deleteRestaurant(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await adminRestaurantAPI.restaurant.delete({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$emit('updateRestaurants', restaurantId);
        this.isProcessing = false;
        this.$toast.fire({
          icon: "success",
          title: "刪除餐廳成功"
        });
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法刪除餐廳，請稍後再試"
        });
      }
    }
  }
});
</script>

<style lang="scss">
th, td {
  text-align: center;
}
</style>
