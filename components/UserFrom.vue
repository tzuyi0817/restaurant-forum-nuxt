
<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="user.name"
        type="text"
        name="name"
        class="form-control"
        placeholder="Enter Name"
        required
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="user.image"
        :src="user.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />

      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中..." : "修改" }}</button>
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { Profile } from '@/types/user';

export default Vue.extend({
  props: {
    initialUser: {
      type: Object as PropType<Profile>,
      default: () => ({
        name: "",
        image: ""
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: { ...this.initialUser },
    };
  },
  watch: {
    initialUser(user) {
      this.user = {
        ...this.user,
        ...user
      };
    }
  },
  methods: {
    handleFileChange(event: Event) {
      const { files } = <HTMLInputElement>event.target;
      if (!files?.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.image = imageURL;
    },
    handleSubmit(event: Event) {
      if (!this.user.name) {
        this.$toast.fire({
          type: "warning",
          title: "請填寫餐廳名稱"
        });
        return;
      }
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
});
</script>