<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <nuxt-link to="#">{{ comment.Restaurant ? comment.Restaurant.name : '-' }}</nuxt-link>
        </h4>
        <p>{{comment.text}}</p>by
        <nuxt-link to="#">{{ comment.User.name }}</nuxt-link>
        {{ comment.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../plugins/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
};
</script>