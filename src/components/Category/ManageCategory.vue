<template>
  <ModalComponent :visible="showModal" :item-id="selectedItemId" @close="closeModal"
                  @confirm="handleDeleteConfirmation"/>
  <div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-6">
      <div v-if="loading" class="flex justify-center items-center h-12">
        <div class="animate-spin rounded-full h-6 w-6 border-2 border-violet-700 border-t-transparent"></div>
      </div>
      <div v-else class="space-y-4">
        <div v-for="item in results" :key="item._id"
             class="flex items-center justify-between bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="h-10 w-10 rounded-full bg-violet-100 p-2">
              <img :src="'../logo/' + item.name + '.svg'" :alt="item.name" class="h-full w-full object-contain"/>
            </div>
            <span class="text-gray-900">{{ item.name }}</span>
          </div>
          <div class="">

            <button @click="openModal(item._id)"
                    class="p-1 px-3 py-1 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
              Remove
            </button>
            <button @click="updateCategoryButton(item._id)"
                    class="ml-1 px-3 py-1 text-sm text-blue-400 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              Update
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {
  deleteCategory,
  fetchAllCategories
  }
  from '@/components/utils/CategoryService.vue'
import router from "@/router/index.js";
import ModalComponent from "@/views/ModalComponent.vue";

const loading = ref(true)
const results = ref([])

const showModal = ref(false)
const selectedItemId = ref(null)
const handleDeleteConfirmation = async (id) => {
  try {
    await deleteCategory(id)
    results.value = results.value.filter(item => item._id !== id)
  } catch (error) {
    console.error('Error deleting documentation:', error)
  }
}
const openModal = (id) => {
  selectedItemId.value = id
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedItemId.value = null
}

const updateCategoryButton = async (id) => {
  try {
    router.push({name: 'updateCategory', params: {id: id}});
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

onMounted(async () => {
  try {
    results.value = await fetchAllCategories()
  } finally {
    loading.value = false
  }
})
</script>