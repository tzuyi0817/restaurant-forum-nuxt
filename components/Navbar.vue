<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <nuxt-link class="navbar-brand" to="/restaurants">餐廳評論網</nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <nuxt-link to="#" class="text-white mr-3">管理員後台</nuxt-link>

        <!-- is user is login -->
        <nuxt-link to="#" class="text-white mr-3">使用者 您好</nuxt-link>
        <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">登出</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  asyncData(context) {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.navbar-toggler {
  min-width: 70px;
  margin-right: 0;
}

nav.bg-dark {
  padding: 14px 16px;
  background-color: #bd2333 !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
}
</style>