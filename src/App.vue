<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div class="page-container">
    <div class="content">
      <NavBar />
      <main class="m-10 flex-grow">
        <router-view />
      </main>
    </div>
    <FooterBar />
  </div>
</template>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>
