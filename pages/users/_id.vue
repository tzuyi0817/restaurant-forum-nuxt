<template>
  <div class="profile mb-3">
    <div class="row no-gutters">
      <div class="card-avatar col-md-4">
        <img :src="profile.image | emptyImage" class="card-img" alt="avatar" />
      </div>

      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <nuxt-link
            v-if="isSelf"
            :to="`/users/${profile.id}/edit`"
            class="btn btn-outline-primary"
          >
            edit
          </nuxt-link>

          <form v-if="isFollowed" :action="`/following/${profile.id}?_method=DELETE`" method="POST">
            <button type="submit" class="btn btn-danger ml-2">取消追蹤</button>
          </form>

          <form v-else :action="`/following/${profile.id}`" method="POST">
            <button type="submit" class="btn btn-primary ml-2">追蹤</button>
          </form>
        </div>
      </div>
    </div>

    <div class="card my-3 w-100">
      <div class="card-header">
        已追蹤 {{ followingCount }} 個對象
      </div>
      <div class="card-body">
        <div class="row">
          <div v-for="following in profile.Followings" :key="following.id" class="list-group col-4 col-lg-1">
            <nuxt-link :to="`/users/${following.id}`" class="card-link">
              <img :src="following.image | emptyImage" class="card-img mb-2" alt="avatar">
              <small class="card-text small">{{ following.name }}</small>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card my-3 w-100">
      <div class="card-header">
        被 {{ followerCount }} 個對象追蹤
      </div>
      <div class="card-body">
        <div class="row">
          <div v-for="follower in profile.Followers" :key="follower.id" class="list-group col-4 col-lg-1">
            <nuxt-link :to="`/users/${follower.id}`" class="card-link">
              <img :src="follower.image | emptyImage" class="card-img mb-2" alt="avatar">
              <small class="card-text small">{{ follower.name }}</small>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card my-3 w-100">
      <div class="card-header">
        已收藏 {{ favoriteCount }} 個餐廳
      </div>
      <div class="card-body">
        <div class="row">
          <div v-for="favorite in profile.FavoritedRestaurants" :key="favorite.id" class="list-group col-4 col-lg-1">
            <nuxt-link :to="`/restaurants/${favorite.id}`" class="card-link">
              <img :src="favorite.image" class="card-img mb-2" alt="avatar">
              <small class="card-text small">{{ favorite.name }}</small>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card my-3 w-100">
      <div class="card-header">
        評論過 {{ restaurants.length }} 個餐廳
      </div>
      <div class="card-body">
        <div class="row">
          <div v-for="restaurant in restaurants" :key="restaurant.id" class="list-group col-4 col-lg-1">
            <nuxt-link :to="`/restaurants/${restaurant.id}`" class="card-link">
              <img :src="restaurant.image" class="card-img mb-2" alt="avatar">
              <small class="card-text small">{{ restaurant.name }}</small>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card my-3 w-100">
      <div class="card-header">
        已留下 {{ commentCount }} 則評論
      </div>
      <div class="list-group">
        <template v-for="comment in profile.Comments">
          <nuxt-link :to="`/restaurants/${comment.Restaurant.id}`" class="list-group-item list-group-item-action">
          <p>{{ comment.text }}</p>
            <small>{{ comment.Restaurant.name }} 餐廳　－{{ comment.createdAt | fromNow }}</small>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from "vuex";
import userAPI from '@/api/users';
import { emptyImageFilter, fromNowFilter } from "@/assets/utils/mixins";
import type { UserId } from '@/types/ajaxPayload';
import type { Profile } from '@/types/user';
import type { Restaurant } from '@/types/restaurant';
import type state from '@/types/store';

export default Vue.extend({
  mixins: [emptyImageFilter, fromNowFilter],
  data() {
    const profile: Profile = {};
    const isFollowed: boolean = false;

    return {
      profile,
      isFollowed,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    isSelf({ profile, currentUser }): boolean {
      return profile?.id === currentUser.id;
    },
    followingCount({ profile }): number {
      return profile.Followings?.length ?? 0;
    },
    followerCount({ profile }): number {
      return profile.Followers?.length ?? 0;
    },
    favoriteCount({ profile }): number {
      return profile.FavoritedRestaurants?.length ?? 0;
    },
    restaurants({ profile }): Array<Restaurant> {
      const hash = new Set();
      const restaurants = (profile?.Comments ?? []).map(comment => comment.Restaurant);
      return restaurants.reduce((result, restaurant) => {
        const { id } = restaurant;

        if (hash.has(id)) return result;
        hash.add(id);
        result.push(restaurant);
        return result;
      }, []);
    },
    commentCount({ profile }): number {
      return profile.Comments?.length ?? 0;
    }
  },
  async fetch() {
    try {
      const { id: userId } = this.$route.params;
      const { data, statusText } = await userAPI.get({ userId });

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
  }
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
    width: 80%;
    max-height: 350px;
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