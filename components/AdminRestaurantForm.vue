<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.CategoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >{{ category.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.opening_hours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />

      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中" : "送出" }}</button>
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { Restaurant } from '@/types/restaurant';
import type { Category } from '@/types/category';

export default Vue.extend({
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true
    },
    isProcessing: {
      type: Boolean,
      default: false
    },
    initialRestaurant: {
      type: Object as PropType<Restaurant>,
      default: () => {
        return {
          name: "",
          CategoryId: "",
          tel: "",
          address: "",
          description: "",
          image: "",
          opening_hours: ""
        };
      }
    }
  },
  data() {
    return {
      restaurant: { ...this.initialRestaurant }
    };
  },
  watch: {
    initialRestaurant(restaurant) {
      this.restaurant = {
        ...this.restaurant,
        ...restaurant
      };
    }
  },
  methods: {
    handleFileChange(event: Event) {
      const { files } = <HTMLInputElement>event.target;
      if (!files?.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.restaurant.image = imageURL;
    },
    handleSubmit(event: Event) {
      if (!this.restaurant.name) {
        this.$toast.fire({
          icon: "warning",
          title: "請填寫餐廳名稱"
        });
        return;
      }
      if (!this.restaurant.CategoryId) {
        this.$toast.fire({
          icon: "warning",
          title: "請選擇餐廳類別"
        });
        return;
      }

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
});
</script>
