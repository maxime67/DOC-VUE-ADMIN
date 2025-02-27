# CategoryForm.vue
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { fetchCategoryById,updateCategoryName, createCategory } from '../utils/CategoryService.vue';
const route = useRoute();
const router = useRouter();

const categoryId = computed(() => route.params.id);
const isEditMode = computed(() => !!categoryId.value);

const category = ref({
  name: '',
});

const loading = ref(false);
const error = ref();

async function fetchData() {
  if (!isEditMode.value) return;

  try {
    category.value = await fetchCategoryById(categoryId.value);
    console.log(category)
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

async function handleSubmit() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    if (isEditMode.value) {
      await updateCategoryName(categoryId.value, category.value);
    } else {
      await createCategory(category.value)
    }

    router.push({ name: "home" });
  } catch (err) {
    error.value = `Failed to ${isEditMode.value ? 'update' : 'create'} category: ${err.message}`;
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
        {{ isEditMode ? 'Update' : 'Create New' }} Category
      </h2>

      <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
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
            <span v-if="loading">{{ isEditMode ? 'Updating...' : 'Creating...' }}</span>
            <span v-else>{{ isEditMode ? 'Update' : 'Create' }} Category</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>