<template>
  <ul class="nav nav-tabs mb-4">
    <li v-for="tab in tabs" :key="tab.id" class="nav-item">
      <nuxt-link :to="tab.path" class="nav-link">{{ tab.title }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          title: "首頁",
          path: "/restaurants"
        },
        {
          id: 2,
          title: "最新動態",
          path: "/restaurants/feeds"
        },
        {
          id: 3,
          title: "TOP 10 人氣餐廳",
          path: "/restaurants/top"
        },
        {
          id: 4,
          title: "美食達人",
          path: "/users/top"
        }
      ]
    };
  }
};
</script>