<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category && restaurant.Category.name }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" :src="restaurant.image" />
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
      <nuxt-link
        class="btn btn-primary btn-border mr-2"
        :to="{
          name: 'restaurants-id-dashboard',
          params: { id: restaurant.id }
        }"
        >Dashboard</nuxt-link
      >

      <button
        v-if="isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="deleteFavorite(restaurant.id)"
        :disabled="isProcessing"
      >
        移除最愛
      </button>

      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite(restaurant.id)"
        :disabled="isProcessing"
      >
        加到最愛
      </button>

      <button
        v-if="isLiked"
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
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import userAPI from "@/api/users";
import type { Restaurant } from '@/types/restaurant';

export default Vue.extend({
  props: {
    restaurant: {
      type: Object as PropType<Restaurant>,
      required: true,
      default: () => {
        return {
          id: -1,
          name: '',
          image: undefined,
          opening_hours: '',
          tel: '',
          address: '',
          description: '',
          Category: { name: '' },
        }
      }
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
    async deleteFavorite(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.deleteFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$emit('updateIsFavorited', false);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法將餐廳從最愛移除，請稍後再試"
        });
      }
    },
    async addFavorite(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.addFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$emit('updateIsFavorited', true);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        this.$toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試"
        });
      }
    },
    async deleteLike(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.deleteLike({ restaurantId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$emit('updateIsLiked', false);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法取消Like，請稍後再試"
        });
      }
    },
    async addLike(restaurantId: number) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await userAPI.addLike({ restaurantId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.$emit('updateIsLiked', true);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        this.$toast.fire({
          icon: "error",
          title: "無法Like，請稍後再試"
        });
      }
    }
  }
});
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
  color: #3333ff;
  &:hover {
    background-color: #3333ff;
    color: #efefef;
  }
}

.img-responsive {
  width: 250px;
  margin-bottom: 25px;
}
</style>
