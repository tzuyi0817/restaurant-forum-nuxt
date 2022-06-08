<template>
  <div class="container py-5">
    <UserProfileCard
      :user="profile"
      :is-current-user="isCurrentUser"
      :initial-is-followed="isFollowed"
      :following-count="followingCount"
      :follower-count="followerCount"
      :comment-count="commentCount"
      :favorite-count="favoriteCount"
    />

    <div class="row">
      <div class="col-md-4">
        <UserFollowingsCard :followings="profile.Followings" :following-count="followingCount" />
        <UserFollowersCard :followers="profile.Followers" :follower-count="followerCount" />
      </div>
      <div class="col-md-8">
        <UserCommentsCard :comments-restaurants="commentsRestaurants" :comment-count="commentCount" />
        <UserFavoriteRestaurantsCard :favorite-restaurants="profile.FavoritedRestaurants" :favorite-count="favoriteCount" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from "vuex";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserFollowingsCard from "@/components/UserFollowingsCard.vue";
import UserFollowersCard from "@/components/UserFollowersCard.vue";
import UserCommentsCard from "@/components/UserCommentsCard.vue";
import UserFavoriteRestaurantsCard from "@/components/UserFavoriteRestaurantsCard.vue";
import userAPI from '@/api/users';
import type { Profile } from '@/types/user';
import type { Comment } from '@/types/comment';
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoriteRestaurantsCard,
  },
  data() {
    return {
      profile: {} as Profile,
      isFollowed: false,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    isCurrentUser(): boolean {
      return this.profile?.id === this.currentUser?.id;
    },
    commentsRestaurants(): Array<Restaurant> {
      const hash = new Set<number>();
      const comments: Array<Comment> = this.profile?.Comments ?? [];
      const restaurants = comments.map((comment: Comment) => comment.Restaurant);
      return restaurants.reduce((result: Array<Restaurant>, restaurant) => {
        const { id } = restaurant;

        if (hash.has(id)) return result;
        hash.add(id);
        result.push(restaurant);
        return result;
      }, []);
    },
    commentCount(): number {
      return this.commentsRestaurants?.length ?? 0;
    },
    followingCount(): number {
      return this.profile?.Followings?.length ?? 0;
    },
    followerCount(): number {
      return this.profile?.Followers?.length ?? 0;
    },
    favoriteCount(): number {
      return this.profile?.FavoritedRestaurants?.length ?? 0;
    },
  },
  async fetch() {
    try {
      const { id: userId } = this.$route.params;
      const { data, statusText } = await userAPI.get({ userId: +userId });

      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      this.profile = data.profile;
      this.isFollowed = data.isFollowed;
    } catch {
      this.$toast.fire({
        icon: "error",
        title: "無法取得 User 資料，請稍後再試"
      });
    }
  },
});
</script>

<style lang="scss" scoped>
.profile {
  .card-avatar {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }

  .card-img {
    width: 90%;
    max-height: 400px;
    margin-bottom: 25px;
    object-fit: cover;
  }

  .card-body {
    form {
      display: contents;
    }

    .card-link {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 10px;
    }

    .card-img {
      width: 100px;
    }
  
    .card-text {
      &.small {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>