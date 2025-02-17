<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const category = ref({
  name: '',
});

const loading = ref(false);
const error = ref();

async function fetchCategory() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APIURL}/api/categories/${route.params.id}`);
    category.value = response.data;
  } catch (err) {
    error.value = 'Failed to load category: ' + err.message;
  }
}

function validateForm() {
  if (!category.value.name.trim()) {
    error.value = 'Name is required';
    return false;
  }
  return true;
}

async function updateCategory() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    await axios.put(
        `${import.meta.env.VITE_APIURL}/api/categories/${route.params.id}`,
        category.value
    );

    router.push({name: "home"});
  } catch (err) {
    error.value = 'Failed to update category: ' + err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCategory);
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
        Update Category
      </h2>

      <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="updateCategory" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">📝 Name</label>
          <input
              v-model.trim="category.name"
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
            <span v-if="loading">Updating...</span>
            <span v-else>Update Category</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>