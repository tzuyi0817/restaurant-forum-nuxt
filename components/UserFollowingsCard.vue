<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ followingCount }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <nuxt-link
        v-for="following in followings"
        :key="following.id"
        :to="{ name: 'users-id', params: { id: following.id } }"
      >
        <img :src="emptyImage(following.image)" width="60" height="60" class="mr-1" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { emptyImage } from "@/assets/utils/mixins";
import type { Follow } from '@/types/follow';

export default Vue.extend({
  props: {
    followings: {
      type: Array as PropType<Follow[]>,
      default: () => []
    },
    followingCount: Number,
  },
  methods: {
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>