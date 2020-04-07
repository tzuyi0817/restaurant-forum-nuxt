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
        <nuxt-link
          v-if="currentUser.isAdmin"
          to="/admin"
          class="text-white mr-3"
          >管理員後台</nuxt-link
        >

        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <nuxt-link to="#" class="text-white mr-3"
            >{{ currentUser.name || "使用者" }} 您好</nuxt-link
          >

          <button
            type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0"
            @click="logout"
          >
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    ...mapMutations(["revokeAuthentication"]),
    logout() {
      this.revokeAuthentication();
      this.$router.push("/signIn");
    }
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
  background: linear-gradient(-40deg, #6666ff, #3333ff) !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
}
</style>
