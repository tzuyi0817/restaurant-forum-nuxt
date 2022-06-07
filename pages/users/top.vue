<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div class="col-6 col-lg-3" v-for="user in users" :key="user.id">
        <nuxt-link :to="`/users/${user.id}`">
          <img :src="emptyImage(user.image)" width="140px" height="140px" />
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

<script lang="ts">
import Vue from 'vue';
import userAPI from "@/api/users";
import NavTabs from "@/components/NavTabs.vue";
import { emptyImage } from "@/assets/utils/mixins";
import type { Profile } from '@/types/user';

type UpdateUsersArgs = {
  follow: boolean;
  userId: number;
};

export default Vue.extend({
  components: {
    NavTabs
  },
  data() {
    return {
      users: [] as Array<Profile>,
      isProcessing: false
    };
  },
  async fetch() {
    try {
      const { data, statusText } = await userAPI.getUsersTop();
      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.users = data.users;
    } catch (error) {
      this.$toast.fire({
        icon: "error",
        title: "無法取得資料，請稍後再試"
      });
    }
  },
  methods: {
    async deleteFollowed(userId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.deleteFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.users = this.updateUsers({ follow: false, userId });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    },
    async addFollowed(userId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.addFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.users = this.updateUsers({ follow: true, userId });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試"
        });
      }
    },
    updateUsers({ follow, userId }: UpdateUsersArgs) {
      return this.users.map(user => {
        if (user.id !== userId) {
          return user;
        }
        return {
          ...user,
          FollowerCount: user.FollowerCount + (follow ? 1 : -1),
          isFollowed: follow
        };
      })
      .sort((a, b) => b.FollowerCount - a.FollowerCount);
    },
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>
