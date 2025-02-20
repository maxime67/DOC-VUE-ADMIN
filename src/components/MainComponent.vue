<template>
  <div class="flex min-h-screen">
    <div class="flex min-h-screen">
      <SidebarComponent @categoryClick="handleCategoryClick" @search="searchWithName" @displayAll="displayAll" />
      <ModalComponent :visible="showModal" :item-id="selectedItemId" @close="closeModal"
                            @confirm="handleDeleteConfirmation" />
      <main class="flex-1 p-6">
        <div class="grid gap-6">
          <div class="relative flex flex-col rounded-lg bg-white">
            <nav class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div v-if="results.length === 0">
                <div class="flex items-center justify-center w-full h-32 text-gray-600 text-xl">
                  No results found 🔎
                </div>
              </div>
              <div v-for="item in results" :key="item._id" class="w-full h-full bg-white p-4 rounded">
                <a :href="item.link">
                  <div
                    class="h-80 group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                    <span
                      class="absolute top-10 z-0 h-20 w-20 rounded-full bg-violet-700 transition-all duration-300 group-hover:scale-[10]">
                    </span>
                    <div class="relative z-10 mx-auto max-w-md">
                      <span
                        class="grid h-20 w-20 place-items-center rounded-full bg-violet-700 transition-all duration-300 group-hover:bg-violet-700">
                        <img :src="'../logo/' + item.category.name + '.svg'" alt="" />
                      </span>
                      <div
                        class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                        <p>
                          {{ item.name }}
                        </p>
                        <p>{{ item.description }}</p>
                      </div>
                      <div class="pt-5 flex items-center justify-between">
                        <p class="flex justify-between w-full gap-4">
                          <a @click.stop.prevent="updateDocButton(item._id)">
                            <button
                              class="rounded-md border border-black py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black hover:text-white hover:bg-violet-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button">
                              Update
                            </button>
                          </a>
                          <a @click.stop.prevent="openModal(item._id)">
                            <button
                              class="rounded-md border border-red-800 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button">
                              Remove
                            </button>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </main>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  fetchAllCategories,
} from '@/components/utils/CategoryService.vue'

import {
  searchByName,
  fetchByCategory,
  fetchAllDocumentation,
  deleteDocumentation
} from "@/components/utils/DocumentationService.vue"
import SidebarComponent from "@/views/Sidebar.vue";
import ModalComponent from '../views/ModalComponent.vue';
import Footer from '../views/FooterViews.vue'
import router from "@/router/index.js";

const categories = ref([])
const selectedSubcategories = ref([])
const loading = ref(false)
const results = ref([])
const showModal = ref(false)
const selectedItemId = ref(null)

const openModal = (id) => {
  selectedItemId.value = id
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedItemId.value = null
}

const handleDeleteConfirmation = async (id) => {
  try {
    await deleteDocumentation(id)
    results.value = results.value.filter(item => item._id !== id)
  } catch (error) {
    console.error('Error deleting documentation:', error)
  }
}

const handleCategoryClick = async (categoryId) => {
  loading.value = true
  try {
    results.value = await fetchByCategory(categoryId, selectedSubcategories.value)
  } catch (error) {
    console.error('Error fetching category data:', error)
  } finally {
    loading.value = false
  }
}

const updateDocButton = async (id) => {
  try {
    router.push({ name: 'updateDocumentation', params: { id: id } });
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
const searchWithName = async (searchString) => {
  try {
    results.value = await searchByName(searchString)
  } catch (error) {
    console.error('Error fetch documentation by name:', error)
  }
}
const displayAll = async () => {
  try {
    results.value = await fetchAllDocumentation()
  } catch (error) {
    console.error('Error fetch All documentation:', error)
  }
};

onMounted(async () => {
  try {
    categories.value = await fetchAllCategories()
    await displayAll()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
</script>