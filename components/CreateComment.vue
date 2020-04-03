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
    addComment() {
      this.$emit("after-create-comment", {
        commentId: 999,
        restaurantId: this.restaurantId,
        text: this.text
      });
      this.text = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>