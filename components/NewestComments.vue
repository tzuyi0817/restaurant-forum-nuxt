<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <nuxt-link :to="{ name: 'restaurants-id', params: { id: comment.Restaurant.id }}">
            {{ comment.Restaurant ? comment.Restaurant.name : '-' }}
          </nuxt-link>
        </h4>
        <p>{{comment.text}}</p>by
        <nuxt-link :to="`/users/${comment.User.id}`">{{ comment.User.name }}</nuxt-link>
        {{ fromNow(comment.createdAt) }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { fromNow } from "@/assets/utils/mixins";
import type { Comment } from '@/types/comment';

export default Vue.extend({
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
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