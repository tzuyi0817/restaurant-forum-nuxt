<template>
  <div id="ec-web">
    <Navbar />
    <main role="main" class="mt-5 bg-white">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

#ec-web {
  font-family: "Noto Sans TC", sans-serif;
}

main {
  margin-top: 65px !important;
}
</style>
