<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :restaurant="restaurant" :is-favorited="isFavorited" :is-liked="isLiked" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments :comments="comments" @after-delete-comment="afterDeleteComment" />
    <!-- 新增評論 CreateComment -->
    <CreateComment :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment" />
  </div>
</template>

<script>
import RestaurantDetail from "../../components/RestaurantDetail";
import RestaurantComments from "../../components/RestaurantComments";
import CreateComment from "../../components/CreateComment";
import restaurantAPI from "../../api/restaurants";
import { Toast } from "../../plugins/sweetalert2";
import { mapState } from "vuex";

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {},
      comments: [],
      isFavorited: false,
      isLiked: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  async asyncData({ params }) {
    try {
      const { data, statusText } = await restaurantAPI.getRestaurant({
        restaurantId: params.id
      });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        restaurant: {
          ...data.restaurant
        },
        comments: data.restaurant.Comments,
        isFavorited: data.isFavorited,
        isLiked: data.isLiked
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得餐廳資料，請稍後再試"
      });
    }
  },
  methods: {
    afterDeleteComment(commentId) {
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;

      this.comments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      });
    }
  }
};
</script>