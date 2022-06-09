<template>
  <div class="container py-5">
    <RestaurantDetail
      :restaurant="restaurant"
      :is-favorited="isFavorited"
      :is-liked="isLiked"
      @update-is-favorited="updateIsFavorited"
      @update-is-liked="updateIsLiked"
    />
    <hr />
    <RestaurantComments :comments="comments" @after-delete-comment="afterDeleteComment" />
    <CreateComment :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RestaurantDetail from "@/components/RestaurantDetail.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import CreateComment from "@/components/CreateComment.vue";
import restaurantAPI from "@/api/restaurants";
import { mapState } from "vuex";
import type { Restaurant } from '@/types/restaurant';
import type { Comment } from '@/types/comment';

type Payload = {
  commentId: number;
  restaurantId: number;
  text: string;
};

export default Vue.extend({
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {} as Restaurant,
      comments: [] as Array<Partial<Comment>>,
      isFavorited: false,
      isLiked: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  async fetch() {
    try {
      const { id: restaurantId } = this.$route.params;
      const { data, statusText } = await restaurantAPI.getRestaurant({ restaurantId: +restaurantId });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      const { restaurant, isFavorited, isLiked } = data;
      this.restaurant = restaurant;
      this.comments = restaurant.Comments;
      this.isFavorited = isFavorited;
      this.isLiked = isLiked;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  },
  methods: {
    updateIsFavorited(status: boolean) {
      this.isFavorited = status;
    },
    updateIsLiked(status: boolean) {
      this.isLiked = status;
    },
    afterDeleteComment(commentId: number) {
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    },
    afterCreateComment(payload: Payload) {
      const { commentId, restaurantId, text } = payload;

      this.comments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          ...this.currentUser
        },
        text,
        createdAt: new Date().toDateString()
      });
    }
  }
});
</script>