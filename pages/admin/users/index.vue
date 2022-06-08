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

<script>
import AdminNav from "../../../components/AdminNav";
import adminAPI from "../../../api/admin";
import { mapState } from "vuex";

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  async asyncData() {
    try {
      const { data, statusText } = await adminAPI.users.get();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        users: data.users
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得會員資料，請稍後再試"
      });
    }
  },
  methods: {
    async toggleUserRole({ userId, isAdmin }) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.users.update({
          userId,
          isAdmin
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin
            };
          }
          return user;
        });

        this.isProcessing = false;

        Toast.fire({
          icon: "success",
          title: "已成功更新會員角色"
        });
      } catch (error) {
        this.isProcessing = false;
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法更新會員角色，請稍後再試"
        });
      }
    }
  }
};
</script>