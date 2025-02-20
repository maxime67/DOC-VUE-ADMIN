// SidebarComponent.vue
<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllCategories } from '@/components/utils/CategoryService.vue'

const props = defineProps({
  onCategoryClick: Function,
  onSearch: Function,
  onDisplayAll: Function
})

const categories = ref([])
const searchString = ref('')

const handleCategoryClick = (categoryId) => {
  if (props.onCategoryClick) {
    props.onCategoryClick(categoryId)
  }
}

const searchWithName = () => {
  if (props.onSearch) {    
    props.onSearch(searchString.value)    
  }
}

const displayAll = () => {
  if (props.onDisplayAll) {
    props.onDisplayAll()
  }
}

onMounted(async () => {
  try {
    categories.value = await fetchAllCategories()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
</script>

<template>
  <aside class="w-64 h-screen">
    <div class="p-4">
      <a @click="displayAll()" class="cursor-pointer text-base font-semibold m-6 group relative w-max">
        <span class="px-1 relative z-10 group-hover:text-white">AA</span>
        <span class="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-violet-700 z-0 group-hover:h-full"></span>
      </a>

      <div v-for="category in categories" :key="category.name" class="mb-2">
        <a @click="handleCategoryClick(category._id)" class="cursor-pointer text-base font-semibold m-6 group relative w-max">
          <span class="px-1 relative z-10 group-hover:text-white">{{ category.name }}</span>
          <span class="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-violet-700 z-0 group-hover:h-full"></span>
        </a>
      </div>

      <div class="inline-flex">
        <router-link to="/add/category">
          <div class="p-4">
            <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <img class="w-8 rounded-md" :src="`../logo/new.png`" />
              </li>
            </ul>
          </div>
        </router-link>
        <router-link to="/manage/category">
          <div class="p-4">
            <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <img class="w-8 rounded-md" :src="`../logo/manage.png`" />
              </li>
            </ul>
          </div>
        </router-link>
      </div>

      <div class="w-full max-w-sm">
        <div class="relative">
          <input
              v-model="searchString"
              type="text"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Name"
          />
          <button
              class="absolute bg-violet-700 right-1 top-1 rounded py-1 px-2.5 border border-transparent text-center text-sm text-white"
              type="button"
              @click="searchWithName()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>