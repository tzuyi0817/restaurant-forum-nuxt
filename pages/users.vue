<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: "authenticated"
};
</script>