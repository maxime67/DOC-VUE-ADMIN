# DocumentForm.vue
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { fetchAllCategories} from "@/components/utils/CategoryService.vue";

const route = useRoute();
const router = useRouter();
const documentId = route.params.id;
const isEditMode = !!documentId;
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

const getStateEmoji = (state) => {
  const stateEmojis = {
    'draft': '📝',
    'published': '📢',
    'archived': '📦',
    'Review': '👀',
    'Pending': '⏳'
  };
  return stateEmojis[state] || '📄';
};

async function fetchData() {
  try {
    // Fetch categories in all cases
    const catResponse = await fetchAllCategories()
    categories.value = catResponse;
    // If in edit mode, fetch document data
    if (isEditMode) {
      const docResponse = await axios.get(`${import.meta.env.VITE_APIURL}/api/documentation/${documentId}`);
      document.value = docResponse.data;
    }
  } catch (err) {
    error.value = 'Failed to load data: ' + err.message;
  }
}

function handleCategoryChange(value) {
  if (isEditMode) {
    document.value.category._id = value;
  } else {
    document.value.category = value;
  }
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

  // Handle different category structures between create/edit modes
  if (isEditMode && !document.value.category?._id) {
    error.value = 'Category is required';
    return false;
  } else if (!isEditMode && !document.value.category) {
    error.value = 'Category is required';
    return false;
  }

  return true;
}

async function handleSubmit() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = null;

    if (isEditMode) {
      await axios.put(
          `${import.meta.env.VITE_APIURL}/api/documentation/${documentId}`,
          document.value
      );
    } else {
      await axios.post(
          `${import.meta.env.VITE_APIURL}/api/documentation`,
          document.value
      );
    }

    await router.push({ name: "home" });
  } catch (err) {
    error.value = `Failed to ${isEditMode ? 'update' : 'create'} document: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12 max-w-3xl">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-gray-900 mb-8">
        {{ isEditMode ? '🔄 Update Document' : '📄 New Document' }}
      </h1>

      <!-- Error Alert -->
      <div
          v-if="error"
          class="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg mb-6 shadow-sm"
      >
        ⚠️ {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8 bg-white p-6 rounded-xl shadow-sm">
        <!-- Name Field -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">📝 Name</label>
          <input
              v-model="document.name"
              type="text"
              required
              class="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
              placeholder="Enter document name"
          />
        </div>

        <!-- Link Field -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">🔗 Link</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500 bg-gray-50 border-r border-gray-300 rounded-l-lg">
              https://
            </div>
            <input
                v-model.trim="document.link"
                type="url"
                required
                class="block w-full pl-24 pr-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
                placeholder="example.com"
            />
          </div>
        </div>

        <!-- Description Field -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">📝 Description</label>
          <input
              v-model.trim="document.description"
              type="text"
              required
              class="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
              placeholder="Enter description"
          />
        </div>

        <!-- Category and State Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Category Select -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">📂 Category</label>
            <select
                :value="isEditMode ? document.category?._id : document.category"
                required
                @change="handleCategoryChange($event.target.value)"
                class="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
            >
              <option value="">Select a category</option>
              <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
              >
                📁 {{ category.name }}
              </option>
            </select>
          </div>

          <!-- State Select -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">🔄 State</label>
            <select
                v-model="document.state"
                required
                class="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
            >
              <option
                  v-for="state in states"
                  :key="state"
                  :value="state"
              >
                {{ getStateEmoji(state) }} {{ state }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-6">
          <button
              type="submit"
              :disabled="loading"
              class="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span v-if="loading">⏳ {{ isEditMode ? 'Updating...' : 'Creating...' }}</span>
            <span v-else>✨ {{ isEditMode ? 'Update' : 'Create' }} Document</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>