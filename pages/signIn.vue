<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >{{isProcessing ? "登入中" : "Submit"}}</button>

      <div class="text-center mb-3">
        <p>
          <nuxt-link to="/signUp">Sign Up</nuxt-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2019-2020</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../api/authorization";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  methods: {
    ...mapMutations(["setCurrentUser"]),

    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          this.$toast.fire({
            icon: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        localStorage.setItem("token", data.token);

        this.setCurrentUser(data.user);

        this.$toast.fire({
          icon: "success",
          title: "登入成功"
        });

        this.$router.push("/restaurants");
      } catch (error) {
        this.password = "";
        this.isProcessing = false;

        this.$toast.fire({
          icon: "error",
          title: "請確認您輸入的帳號密碼錯誤"
        });
      }
    }
  }
};
</script>