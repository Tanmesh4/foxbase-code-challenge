<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <NavBar />
  <main class="m-10 flex-grow">
    <RouterView />
  </main>
  <FooterBar />
</template>

<style scoped></style>
