<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{ restaurant.Category.name }}</p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px;margin-bottom: 25px;"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.opening_hours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <nuxt-link class="btn btn-primary btn-border mr-2" to="#">Dashboard</nuxt-link>

      <button
        v-if="isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="deleteFavorite(restaurant.id)"
        :disabled="isProcessing"
      >移除最愛</button>

      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite(restaurant.id)"
        :disabled="isProcessing"
      >加到最愛</button>

      <button
        v-if="isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="deleteLike(restaurant.id)"
        :disabled="isProcessing"
      >Unlike</button>

      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLike(restaurant.id)"
        :disabled="isProcessing"
      >Like</button>
    </div>
  </div>
</template>

<script>
import userAPI from "../api/users";
import { Toast } from "../plugins/sweetalert2";

export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    },
    isFavorited: {
      type: Boolean,
      default: false
    },
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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

        this.isFavorited = false;

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

        this.isFavorited = true;

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

        this.isLiked = false;

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

        this.isLiked = true;

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
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}

.btn-border.btn {
  background-color: #efefef;
  color: #bd2333;
  &:hover {
    background-color: #bd2333;
    color: #efefef;
  }
}
</style>