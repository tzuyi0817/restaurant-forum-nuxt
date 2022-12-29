<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoriteCount }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <nuxt-link
        v-for="favoriteRestaurant in favoriteRestaurants"
        :key="favoriteRestaurant.id"
        :to="{ name: 'restaurants-id', params: { id: favoriteRestaurant.id } }"
      >
        <img :src="emptyImage(favoriteRestaurant.image)" width="60" height="60" class="mr-1" />
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
    favoriteRestaurants: {
      type: Array as PropType<Restaurant[]>,
      default: () => []
    },
    favoriteCount: Number,
  },
  methods: {
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>