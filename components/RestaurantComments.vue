<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in comments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="deleteComment(comment.id)"
          :disabled="isProcessing"
        >Delete</button>
        <h3>
          <nuxt-link :to="`/users/${comment.User.id}`">{{ comment.User.name }}</nuxt-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">{{ fromNow(comment.createdAt) }}</footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import commentAPI from "@/api/comments";
import { fromNow } from "@/assets/utils/mixins";
import type { Comment } from '@/types/comment';

export default Vue.extend({
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async deleteComment(commentId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await commentAPI.deleteComment({ commentId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$emit("after-delete-comment", commentId);

        this.$toast.fire({
          icon: "success",
          title: "成功刪除評論"
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        this.$toast.fire({
          icon: "error",
          title: "無法刪除評論，請稍再試"
        });
      }
    },
    fromNow(time: string) {
      return fromNow(time);
    }
  },
});
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