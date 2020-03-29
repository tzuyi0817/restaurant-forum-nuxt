<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light"
    style="display:flex; justify-content: center;"
  >
    <router-link class="navbar-title btn" to="/">MuseClub</router-link>

    <!-- 搜尋  -->
    <form @submit.prevent="handleSearch(keyword)">
      <input
        class="searchKeyword mr-1"
        type="text"
        id="keyword"
        v-model="keyword"
        name="keyword"
        placeholder="請輸入 商品 關鍵字"
      />
      <button class="searchBtn" type="submit">
        <span class="fa fa-search ml-1">&nbsp;搜尋商品&nbsp;</span>
      </button>
    </form>

    <!-- cart -->
    <!-- <div class="cartIcon">
      <router-link to="/cart" class="nav-logo btn">
        <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
        <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
      </router-link>
    </div>-->

    <!-- profile -->
    <!-- <div class="user" v-if="isAuthenticated">
      <router-link :to="{name: 'UserProfile', params: { id: currentUser.id }}" class="nav-logo btn">
        <img class="navAvatar" :src="currentUser.image" />
      </router-link>
    </div>
    <div class="login" v-else>
      <router-link to="/users/logIn?redirect=/" class="nav-logo btn">
        <i class="fas fa-user"></i> 登入會員
      </router-link>
    </div>-->

    <!-- admin -->
    <!-- <div class="admin mr-2" v-if="currentUser.role === 1">
      <router-link to="/admin/index" class="nav-logo btn">
        <i class="fas fa-tasks"></i>
      </router-link>
    </div>-->

    <!-- logout -->
    <!-- <div class="logout" v-if="isAuthenticated">
      <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">登出</button>
    </div>-->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    handleSearch(keyword) {
      this.$router.push({ path: "/ESHOP/search", query: { keyword } });
      // 清空搜尋欄位
      this.keyword = "";
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/users/logIn");
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
    @content;
  }
}
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}
%hover {
  background-color: #3ac4e2;
  color: white;
}
.navbar {
  background-color: #d2f0f5;
  padding: 20px;
  &-title {
    font-family: "Pacifico", cursive;
    color: #0085a5;
    font-size: 25px;
    margin-right: 60px;
    @include respond-between(960px, 1100px, 22px);
    @include respond-between(768px, 960px, 17px) {
      margin-right: 30px;
    }
    @include respond-and(768px) {
      margin-right: 10px;
    }
    &:hover {
      @extend %hover;
      text-decoration: none;
    }
  }
}
.navAvatar {
  width: 23px;
  border-radius: 50%;
}
.nav-logo {
  color: #0085a5;
  @include respond-between(960px, 1100px, 18px);
  @include respond-between(768px, 960px, 13px);
  @include respond-and(768px) {
    font-size: 15px;
  }
  &:hover {
    @extend %hover;
  }
}
.searchBtn {
  background-color: #3ac4e2;
  color: white;
  cursor: pointer;
  padding: 3px;
  font-size: 18px;
  line-height: 30px;
  margin: 0 5px;
  margin-right: 60px;
  border: {
    radius: 5px;
    width: 2px;
    style: solid;
  }
  @include respond-between(960px, 1100px, 16px);
  @include respond-between(768px, 960px, 11px) {
    margin-right: 20px;
  }
  @include respond-and(768px) {
    font-size: 10px;
    padding: 0px;
    margin-right: 0px;
  }
}
.searchKeyword {
  width: 350px;
  @include respond-between(960px, 1100px, 18px) {
    width: 300px;
  }
  @include respond-between(768px, 960px, 13px) {
    width: 250px;
  }
  @include respond-and(768px) {
    width: 230px;
    font-size: 15px;
  }
}
.badge {
  font-size: 75%;
  display: inline-block;
  color: gray;
}
.btn-outline-success {
  @include respond-between(960px, 1100px, 18px);
  @include respond-between(768px, 960px, 13px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}
</style>