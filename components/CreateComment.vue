<template>
  <form @submit.stop.prevent="addComment">
    <div class="form-group">
      <label for="text">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text" />
    </div>
    <div class="text-right">
      <button type="submit" class="btn btn-primary mr-0" :disabled="isProcessing">Submit</button>
    </div>
  </form>
</template>

<script>
import commentsAPI from "../api/comments";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: "",
      isProcessing: false
    };
  },
  methods: {
    async addComment() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫任何評論"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await commentsAPI.createComment({
          restaurantId: this.restaurantId,
          text: this.text
        });

        if ((statusText !== "OK", data.status !== "success")) {
          throw new Error(statusText);
        }

        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text
        });

        this.text = "";
        this.isProcessing = false;

        this.$toast.fire({
          icon: "success",
          title: "成功新增評論"
        });
      } catch (error) {
        this.isProcessing = false;

        this.$toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>