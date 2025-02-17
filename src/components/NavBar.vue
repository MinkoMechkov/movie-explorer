<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedKeys = ref<string[]>([router.currentRoute.value.path]);

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    selectedKeys.value = [newPath];
  }
);

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key);
};
</script>

<template>
  <a-menu
    mode="horizontal"
    v-model:selectedKeys="selectedKeys"
    @click="handleMenuClick"
  >
    <a-menu-item key="/">Home</a-menu-item>
    <a-menu-item key="/favorites">Favorites</a-menu-item>
  </a-menu>
</template>
