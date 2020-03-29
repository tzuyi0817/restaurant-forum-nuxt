<template>
  <div id="ec-web">
    <Navbar />
    <main role="main" class="main">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

#ec-web {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
