
<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="emptyImage(user.image)" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled">
            <li>
              <strong>{{ commentCount }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ favoriteCount }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ followingCount }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ followerCount}}</strong> followers (追隨者)
            </li>
          </ul>
          <template v-if="isCurrentUser">
            <nuxt-link :to="{ name:'users-id-edit', params: { id: user.id } }" class="btn btn-primary">
              Edit
            </nuxt-link>
          </template>
          <template v-else>
            <button
              v-if="isFollowed"
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="removeFollowing(user.id)"
            >取消追蹤</button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollowing(user.id)"
            >追蹤</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import usersAPI from "@/api/users";
import { emptyImage } from "@/assets/utils/mixins";
import type { Profile } from '@/types/user';

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<Profile>,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    },
    commentCount: Number,
    favoriteCount: Number,
    followerCount: Number,
    followingCount: Number,
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed
    };
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    }
  },
  methods: {
    async addFollowing(userId: number) {
      try {
        const { data, statusText } = await usersAPI.addFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.isFollowed = true;
      } catch (error) {
        this.$toast.fire({
          type: "error",
          title: "無法追蹤，請稍後再試"
        });
      }
    },
    async removeFollowing(userId: number) {
      try {
        const { data, statusText } = await usersAPI.deleteFollowing({ userId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.isFollowed = false;
      } catch (error) {
        this.$toast.fire({
          type: "error",
          title: "無法取消追蹤，請稍後再試"
        });
      }
    },
    emptyImage(src: string | null) {
      return emptyImage(src ?? '');
    },
  }
});
</script>