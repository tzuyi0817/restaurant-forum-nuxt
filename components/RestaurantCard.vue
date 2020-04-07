<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <nuxt-link
            :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
            >{{ restaurant.name }}</nuxt-link
          >
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category.name
        }}</span>
        <p class="card-text text-truncate">{{ restaurant.description }}</p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
          :disabled="isProcessing"
        >
          移除最愛
        </button>

        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite(restaurant.id)"
          :disabled="isProcessing"
        >
          加到最愛
        </button>

        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
          @click.stop.prevent="deleteLike(restaurant.id)"
          :disabled="isProcessing"
        >
          Unlike
        </button>

        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.stop.prevent="addLike(restaurant.id)"
          :disabled="isProcessing"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "../api/users";
import { Toast } from "../plugins/sweetalert2";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    };
  },
  methods: {
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await userAPI.deleteFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        };

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從最愛移除，請稍後再試"
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await userAPI.addFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        };

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試"
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await userAPI.deleteLike({ restaurantId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法取消Like，請稍後再試"
        });
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await userAPI.addLike({ restaurantId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法Like，請稍後再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #6495ed;
  background-color: transparent;
}

.btn-border.btn {
  background-color: #efefef;
  color: #6495ed;
  &:hover {
    background-color: #6495ed;
    color: #efefef;
  }
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}

.card-img-top {
  background-color: #efefef;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>
