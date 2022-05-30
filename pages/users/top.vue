<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <nuxt-link to="#">
          <img :src="user.image | emptyImage" width="140px" height="140px" />
        </nuxt-link>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary">追蹤人數：{{ user.FollowerCount }}</span>
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="deleteFollowed(user.id)"
            :disabled="isProcessing"
          >取消追蹤</button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollowed(user.id)"
            :disabled="isProcessing"
          >追蹤</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../../components/NavTabs";
import userAPI from "../../api/users";
import { emptyImageFilter } from "../../plugins/mixins";
export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs
  },
  data() {
    return {
      users: [],
      isProcessing: false
    };
  },
  async asyncData() {
    try {
      const { data, statusText } = await userAPI.getUsersTop();
      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      return {
        users: data.users
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async deleteFollowed(userId) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.deleteFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              FollowerCount: user.FollowerCount - 1,
              isFollowed: false
            };
          })
          .sort((a, b) => b.FollowerCount - a.FollowerCount);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    },
    async addFollowed(userId) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.addFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              FollowerCount: user.FollowerCount + 1,
              isFollowed: true
            };
          })
          .sort((a, b) => b.FollowerCount - a.FollowerCount);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試"
        });
      }
    }
  }
};
</script>