<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavTabs from "@/components/NavTabs.vue";
import NewestRestaurants from "@/components/NewestRestaurants.vue";
import NewestComments from "@/components/NewestComments.vue";
import restaurantsAPI from "@/api/restaurants";
import type { Restaurant } from '@/types/restaurant';
import type { Comment } from '@/types/comment';

export default Vue.extend({
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments
  },
  data() {
    return {
      restaurants: [] as Array<Restaurant>,
      comments: [] as Array<Comment>,
    };
  },
  async fetch() {
    const { data, statusText } = await restaurantsAPI.getFeeds();
  
    if (statusText !== "OK") {
      throw new Error(statusText);
    }

    this.restaurants = data.restaurants;
    this.comments = data.comments;
  }
});
</script>