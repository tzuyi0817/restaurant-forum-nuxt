<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in comments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="deleteComment(comment.id)"
          :disabled="isPorcessing"
        >Delete</button>
        <h3>
          <nuxt-link to="#">{{ comment.User.name }}</nuxt-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">{{ comment.createdAt | fromNow }}</footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "@/assets/utils/mixins";
import commentAPI from "../api/comments";

export default {
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isPorcessing: false
    };
  },
  methods: {
    async deleteComment(commentId) {
      try {
        this.isPorcessing = true;

        const { data, statusText } = await commentAPI.deleteComment({
          commentId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$emit("after-delete-comment", commentId);

        this.$toast.fire({
          icon: "success",
          title: "成功刪除評論"
        });

        this.isPorcessing = false;
      } catch (error) {
        this.isPorcessing = false;

        this.$toast.fire({
          icon: "error",
          title: "無法刪除評論，請稍再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}
h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}
.blockquote-footer {
  font-size: 12.5px;
}
</style>