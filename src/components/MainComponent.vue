<template>
  <div class="flex min-h-screen">
    <aside class="w-64 h-screen">
      <div class="p-4">
        <a @click="displayAll()" class=" cursor-pointer text-base font-semibold m-6 group relative w-max">
          <span class="px-1 relative z-10 group-hover:text-white">All</span>
          <span class="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-violet-700 z-0 group-hover:h-full "></span>
        </a>
        <div v-for="category in categories" :key="category.name" class="mb-2">
          <a @click="handleCategoryClick(category._id)" class=" cursor-pointer text-base font-semibold m-6 group relative w-max">
            <span class="px-1 relative z-10 group-hover:text-white">{{ category.name }}</span>
            <span class="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-violet-700 z-0 group-hover:h-full "></span>
          </a>
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">
            <input v-model="searchString" type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
            <button
                class="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                @click="searchWithName()"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 p-6">
      <div v-if="loading">Loading...</div>
      <div v-else class="grid gap-6">
        <div class="relative flex flex-col rounded-lg bg-white">
          <nav class="grid grid-cols-2 gap-6">
            <div v-for="item in results" :key="item._id" class="w-full h-full bg-white p-4 rounded">
              <a :href="item.link">
              <div
                  class="h-80 group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-violet-700 transition-all duration-300 group-hover:scale-[10]">
                </span>
                <div class="relative z-10 mx-auto max-w-md">
            <span class="grid h-20 w-20 place-items-center rounded-full bg-violet-700 transition-all duration-300 group-hover:bg-violet-700">
                    <img :src="`../logo/accelerate.svg`" />
            </span>
                  <div
                      class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <p>
                      {{ item.name }}
                    </p>
                    <p>{{ item.description }}</p>
                  </div>
                  <div class="pt-5 flex items-center justify-between">
                    <p class="flex gap-4"> <!-- Add flex and gap for spacing between images -->
                      <a @click.stop="deleteDoc(item._id)" class="text-sky-500 transition-all duration-300 group-hover:text-white">
                        <img class="w-8" :src="`../logo/bin.png`">
                      </a>
                      <a @click.stop.prevent="updateDocButton(item._id)" class="text-sky-500 transition-all duration-300 group-hover:text-white">
                        <img class="w-8" :src="`../logo/modify.png`">
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
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {
  deleteDoc,
  fetchAll,
  fetchByCategory,
  fetchCategories,
  searchByName,
  updateDoc
} from '@/components/utils/ApiService.vue'

const categories = ref([])
const selectedSubcategories = ref([])
const loading = ref(false)
const results = ref()
const searchString = ref()
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

const deleteDocButton = async (id) => {
  try {
    await deleteDoc(id)
    location.reload()
  } catch (error) {
    console.error('Error delete documentation:', error)
  }
};

const updateDocButton = async (id) => {
  try {
    await updateDoc(id)
  } catch (error) {
    console.error('Error delete documentation:', error)
  }
};
const searchWithName = async () => {
  try {
    results.value = await searchByName(searchString)
  } catch (error) {
    console.error('Error fetch documentation by name:', error)
  }
}
const displayAll = async () => {
  try {
    results.value = await fetchAll()
  } catch (error) {
    console.error('Error fetch All documentation:', error)
  }
};

onMounted(async () => {
  try {
    categories.value = await fetchCategories()
    displayAll()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
</script>