<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <nuxt-link class="navbar-brand" to="/restaurants">餐廳評論網</nuxt-link>
      <button
        v-if="isAuthenticated"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.prevent.stop="checked"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarSupportedContent" class="navbar-collapse collapse" v-if="isAuthenticated">
        <div class="ml-auto d-flex align-items-center">
          <!-- is user is admin -->
          <nuxt-link
            v-if="currentUser.isAdmin"
            to="/admin/restaurants"
            class="text-white mr-3"
          >管理員後台</nuxt-link>

          <!-- is user is login -->
          <template>
            <nuxt-link :to="`/users/${currentUser.id}`" class="text-white mr-3">
              {{ currentUser.name || "使用者" }} 您好
            </nuxt-link>

            <button
              type="button"
              class="btn btn-sm btn-outline-success my-2 my-sm-0"
              @click="logout"
            >登出</button>
          </template>
        </div>
      </div>
    </nav>

    <ul v-show="open" class="checked-nav">
      <li @click.prevent.stop="checked" v-if="currentUser.isAdmin">
        <nuxt-link to="/admin/restaurants" class="text-white mr-3">管理員後台</nuxt-link>
      </li>
      <li @click.prevent.stop="checked">
        <nuxt-link :to="`/users/${currentUser.id}`" class="text-white mr-3">會員管理</nuxt-link>
      </li>
      <li @click.prevent.stop="checked">
        <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0" @click="logout">登出</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      open: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    ...mapMutations(["revokeAuthentication"]),
    logout() {
      this.revokeAuthentication();
      this.$router.push("/signin");
    },
    checked() {
      this.open = !this.open;
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

.checked-nav {
  position: fixed;
  z-index: 100;
  border: 1xp solid black;
  display: block;
  margin-top: -5px;
  margin-right: 15px;
  list-style-type: none;
  background: linear-gradient(-100deg, #6666ff, #3333ff) !important;
  width: 100%;
  padding: 25px;
  text-align: center;
  li {
    margin-top: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid white;
    padding: 10px;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: red;
      transition: all 0.4s linear;
    }
  }
}
</style>
