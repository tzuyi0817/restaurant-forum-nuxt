<template>
  <ul class="nav nav-pills mb-4">
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'restaurants' }">全部</nuxt-link>
    </li>

    <li v-for="category in categories" :key="category.id" class="nav-item">
      <nuxt-link
        class="nav-link"
        :to="{ name: 'restaurants', query: { categoryId: category.id } }"
        >{{ category.name }}</nuxt-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { Category } from '@/types/category';

export default Vue.extend({
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.nav-pills {
  display: flex;
  align-items: center;
  margin-bottom: 1rem !important;
  .nav-link {
    margin-right: 7px;
    margin-bottom: 7px;
    padding: 5px 10px 3px;
    color: #4d4d4d;
    border: 1px solid #a1a1a1;
    transition: none;
  }
  .nav-link.active,
  .show > .nav-link {
    border-width: 2px;
    background-color: #3333ff;
    border-color: #3333ff;
    color: #fff;
  }
}
</style>
