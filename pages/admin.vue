<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: "authorizeIsAdmin"
};
</script>