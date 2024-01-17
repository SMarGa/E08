<template>
  <v-app class="bg_image">
    <default-bar />

    <default-view />

    <default-footer />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import DefaultFooter from "./Footer.vue";
</script>

<style scoped>
.bg_image {
  background: #ffaaa8;
  background-size: cover;
}
</style>
