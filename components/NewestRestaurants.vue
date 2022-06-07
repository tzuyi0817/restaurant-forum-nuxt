<template>
  <div class="card">
    <div class="card-header">最新餐廳</div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <nuxt-link :to="{ name: 'restaurants-id', params: { id: restaurant.id }}">
            {{ restaurant.name }}
          </nuxt-link>&nbsp;
          <small>{{ restaurant.Category.name }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>
        {{ fromNow(restaurant.createdAt) }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { fromNow } from "@/assets/utils/mixins";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  props: {
    restaurants: {
      type: Array as PropType<Restaurant[]>,
      required: true
    }
  },
  methods: {
    fromNow(time: string) {
      return fromNow(time);
    }
  }
});
</script>