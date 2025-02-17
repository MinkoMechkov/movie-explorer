<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-header>
      <NavBar />
    </a-layout-header>

    <a-layout-content class="content">
      <router-view />
    </a-layout-content>

    <a-layout-footer class="footer">
      Movie Explorer ©2025 Created with Ant Design Vue
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  text-align: center;
  padding: 12px;
  background: #001529;
  color: white;
}
</style>
