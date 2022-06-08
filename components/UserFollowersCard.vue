
<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followerCount }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <nuxt-link
        v-for="follower in followers"
        :key="follower.id"
        :to="{ name: 'users-id', params: { id: follower.id } }"
      >
        <img :src="emptyImage(follower.image)" width="60" height="60" class="mr-1" />
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
    followers: {
      type: Array as PropType<Follow[]>,
      default: () => []
    },
    followerCount: Number,
  },
  methods: {
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>