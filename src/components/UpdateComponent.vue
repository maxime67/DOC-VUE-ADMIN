<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const documentId = route.params.id;

const document = ref({
  name: '',
  category: '',
  link: '',
  description: '',
  state: 'publish'
});

const loading = ref(false);
const categories = ref([]);
const error = ref();
const states = ['draft', 'published', 'archived'];

async function fetchData() {
  try {
    const docResponse = await axios.get(`${import.meta.env.VITE_APIURL}/api/documentation/${documentId}`)
    const catResponse = await axios.get(`${import.meta.env.VITE_APIURL}/api/categories`)

    document.value = docResponse.data;
    categories.value = catResponse.data;
  } catch (err) {
    error.value = 'Failed to load data: ' + err.message;
  }
}

function handleCategoryChange(value) {
  document.value.category._id = value;
  console.log(document.value.category);
}

function validateForm() {
  if (!document.value.name.trim()) {
    error.value = 'Name is required';
    return false;
  }
  if (!document.value.link.trim()) {
    error.value = 'Link is required';
    return false;
  }
  if (!document.value.description.trim()) {
    error.value = 'Description is required';
    return false;
  }
  if (!document.value.category) {
    error.value = 'Category is required';
    return false;
  }
  return true;
}

async function updateDocument() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    await axios.put(
        `${import.meta.env.VITE_APIURL}/api/documentation/${documentId}`,
        document.value
    );

    await router.push({name: "home"});

  } catch (err) {
    error.value = 'Failed to update document: ' + err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
        Update Document
      </h2>

      <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="updateDocument" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
              v-model="document.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
              placeholder="Enter document name"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Link</label>
          <input
              v-model.trim="document.link"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
              placeholder="https://example.com"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <input
              v-model.trim="document.description"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
              placeholder="Description"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
                v-model="document.category._id"
                required
                @change="handleCategoryChange($event.target.value)"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all bg-white"
            >
              <option value="">Select a category</option>
              <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">State</label>
            <select
                v-model="document.state"
                required
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all bg-white"
            >
              <option v-for="state in states" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
          </div>
        </div>

        <div class="pt-6">
          <button
              type="submit"
              :disabled="loading"
              class="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Updating...</span>
            <span v-else>Update Document</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>