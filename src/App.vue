<script setup>
import { onMounted } from 'vue';
import NavbarView from "@/views/NavbarView.vue";
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuth();
});
</script>

<template>
  <NavbarView></NavbarView>
  <RouterView></RouterView>
</template>

<style scoped>
</style>