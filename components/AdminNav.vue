<template>
  <div class="mb-3">
    <h1>餐廳後台</h1>
    <nuxt-link :to="{ name: 'admin-restaurants' }">Restaurants</nuxt-link>|
    <nuxt-link :to="{ name: 'admin-categories'}">Categories</nuxt-link>|
    <nuxt-link to="#">Users</nuxt-link>
  </div>
</template>
