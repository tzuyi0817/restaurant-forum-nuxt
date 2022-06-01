<template>
  <div class="card">
    <div class="card-header">最新餐廳</div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <nuxt-link
            :to="{ name: 'restaurants-id', params: { id: restaurant.id}}"
          >{{ restaurant.name }}</nuxt-link>&nbsp;
          <small>{{ restaurant.Category.name }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>
        {{ restaurant.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "@/assets/utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
};
</script>