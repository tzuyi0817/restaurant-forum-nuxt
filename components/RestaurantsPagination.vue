<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 回到上一頁 previousPage -->
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

      <!-- 頁碼 -->
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

      <!-- 前往下一頁 nextPage -->
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

<script>
export default {
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
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
%active-and-hover-style {
  color: white;
  background-color: #6495ed;
  border-color: #6495ed;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-link {
  height: 37px;
  padding: 7px 20px;
  color: #6495ed;
  &:hover,
  &:hover span {
    @extend %active-and-hover-style;
  }
}

.page-item {
  span {
    color: #6495ed;
  }
  &.active .page-link,
  &.active span {
    @extend %active-and-hover-style;
    z-index: 1;
  }
}
</style>
