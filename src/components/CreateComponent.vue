<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";


const document = ref({
  name: '',
  category: '',
  link: '',
  description: '',
  state: 'draft'
});

const loading = ref(false);
const categories = ref([]);
const error = ref();
const states = ['draft', 'published', 'archived'];

async function fetchCategories() {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
    categories.value = response.data;
  } catch (err) {
    error.value = 'Failed to load categories: ' + err.message;
  }
}

function handleCategoryChange(value) {
  document.value.category = value;
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
  if (!document.value.category) {
    error.value = 'Category is required';
    return false;
  }
  if (!document.value.description) {
    error.value = 'Description is required';
    return false;
  }
  if (!document.value.state) {
    document.value.state = 'draft';
  }
  return true;
}

async function createDocument() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    const response = await axios.post(
        `${import.meta.env.VITE_APIURL}/api/documentation`,
        document.value
    );

    router.push({name: "home"})

  } catch (err) {
    error.value = 'Failed to create category, same name already exist ';
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


      <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="createDocument" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
              v-model.trim="document.name"
              type="text"
              required
              class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
              placeholder="Enter document name"
          />
        </div>
        <label class="block text-sm font-medium text-gray-700">Link</label>
        <div class="relative">
        <div class=" absolute left-0 top-0.5 py-2 text-sm h-10 px-3 text-gray-500 border-r border-gray-300"> https:// </div>
        <input required v-model.trim="document.link" type="url" class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="https://google.com">
        </div>
        <!-- <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Link</label>
          <input
              v-model.trim="document.link"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
              placeholder="https://example.com"
          />
        </div> -->

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <input
              v-model.trim="document.description"
              type="text"
              required
              class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
              placeholder="Description"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
                v-model="document.category"
                required
                @change="handleCategoryChange($event.target.value)"
                class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
            >
              <option 
              value="">Select a category</option>
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
                class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
            >
              <option
              class="block w-full max-w-xs pr-4 pl-20 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
              v-for="state in states" :key="state" :value="state">
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
            <span v-if="loading">Creating...</span>
            <span v-else>Create Document</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>