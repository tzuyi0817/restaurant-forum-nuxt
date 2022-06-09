<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-show="previousPage" class="page-item">
        <nuxt-link
          class="page-link"
          aria-label="Previous"
          :to="{
            name: 'restaurants',
            query: { categoryId, page: previousPage }
          }"
        >
          <span aria-hidden="true">&laquo;</span>
        </nuxt-link>
      </li>

      <li
        v-for="page in totalPage"
        :key="page"
        class="page-item"
        :class="['page-item', { active: currentPage === page }]"
      >
        <nuxt-link
          class="page-link"
          :to="{ name: 'restaurants', query: { categoryId, page } }"
          >{{ page }}</nuxt-link
        >
      </li>

      <li v-show="nextPage" class="page-item">
        <nuxt-link
          class="page-link"
          :to="{ name: 'restaurants', query: { categoryId, page: nextPage } }"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    categoryId: {
      type: [String, Number],
      default: ""
    },
    currentPage: {
      type: Number,
      default: -1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  computed: {
    previousPage(): number | null {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage(): number | null {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
  }
});
</script>

<style lang="scss" scoped>
%active-and-hover-style {
  color: white;
  background-color: #3333ff;
  border-color: #3333ff;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-link {
  height: 37px;
  padding: 7px 20px;
  color: #3333ff;
  &:hover,
  &:hover span {
    @extend %active-and-hover-style;
  }
  &:hover span {
    background-color: transparent;
  }
}

.page-item {
  span {
    color: #3333ff;
  }
  &.active .page-link,
  &.active span {
    @extend %active-and-hover-style;
    z-index: 1;
  }
}
</style>
