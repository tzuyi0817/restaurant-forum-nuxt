<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user'}}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="
                toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
              "
              :disabled="isProcessing"
            >{{ user.isAdmin ? 'set as user' : 'set as admin' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminNav from "@/components/AdminNav.vue";
import adminAPI from "@/api/admin";
import { mapState } from "vuex";
import type { Profile } from '@/types/user';

interface toggleUserRoleArgs {
  userId: number;
  isAdmin: boolean;
};

export default Vue.extend({
  components: {
    AdminNav
  },
  data() {
    return {
      users: [] as Array<Profile>,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  async fetch() {
    try {
      const { data, statusText } = await adminAPI.users.get();
      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.users = data.users;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得會員資料，請稍後再試"
      });
    }
  },
  methods: {
    async toggleUserRole({ userId, isAdmin }: toggleUserRoleArgs) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.users.update({
          userId,
          isAdmin
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.updateUsers(userId);
        this.isProcessing = false;
        this.$toast.fire({
          icon: "success",
          title: "已成功更新會員角色"
        });
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法更新會員角色，請稍後再試"
        });
      }
    },
    updateUsers(userId: number) {
      const user = this.users.find(user => user.id === userId);
      if (user === void 0) return;
      user.isAdmin = !user.isAdmin;
    }
  }
});
</script>