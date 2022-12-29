<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ commentCount }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <nuxt-link
        v-for="restaurant in commentsRestaurants"
        :key="restaurant.id"
        :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
      >
        <img :src="emptyImage(restaurant.image)" width="60" height="60" class="mr-1" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { emptyImage } from "@/assets/utils/mixins";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  props: {
    commentsRestaurants: {
      type: Array as PropType<Restaurant[]>,
      default: () => []
    },
    commentCount: Number,
  },
  methods: {
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  },
});
</script>