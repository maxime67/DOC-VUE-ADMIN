<script setup>

import MainComponent from "@/components/MainComponent.vue";
async function loadConfig() {
  try {
    const response = await fetch('/config/app-config.json')
    const config = await response.json()
    return config
  } catch (error) {
    return { apiUrl: 'http://localhost:3000' } // fallback
  }
}
</script>

<template>
  <MainComponent></MainComponent>
</template>

<style scoped>

</style>
