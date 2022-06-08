<template>
  <div class="container py-5">
    <UserFrom :initial-user="currentUser" @after-submit="handleAfterSubmit" :is-processing="isProcessing" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserFrom from "@/components/UserFrom.vue";
import userAPI from "@/api/users";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    UserFrom
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async handleAfterSubmit(formData: FormData) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.update({
          userId: this.currentUser.id,
          formData
        });
        this.isProcessing = false;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$store.dispatch('fetchCurrentUser');
        this.$router.push({ name:'users-id', params: { id: this.currentUser.id } });
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          type: "error",
          title: "無法修改資料，請稍後再試"
        });
      }
    },
  }
});
</script>