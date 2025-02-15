<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";


const document = ref({
  name: '',
});

const loading = ref(false);
const categories = ref([]);
const error = ref();

async function fetchCategories() {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
    categories.value = response.data;
  } catch (err) {
    error.value = 'Failed to load categories: ' + err.message;
  }
}

function validateForm() {
  if (!document.value.name.trim()) {
    error.value = 'Name is required';
    return false;
  }
  return true;
}

async function createDocument() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    const response = await axios.post(
        `${import.meta.env.VITE_APIURL}/api/categories`,
        document.value
    );

    router.push({name: "home"})

  } catch (err) {
    error.value = 'Failed to create document: ' + err.message;
    emit('error', error.value);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCategories);
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
        Create New Document
      </h2>

      <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="createDocument" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">📝 Name</label>
          <input
              v-model.trim="document.name"
              type="text"
              required
              class="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
              placeholder="Enter Category name"
          />
        </div>

        <div class="pt-6">
          <button
              type="submit"
              :disabled="loading"
              class="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Creating...</span>
            <span v-else>Create Category</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>