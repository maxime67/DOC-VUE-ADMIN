<template>
  <!-- Desktop Sidebar -->
  <aside class="w-80 min-h-screen bg-white shadow-xl border-r border-gray-100 relative z-40">
    <!-- Header -->
    <div class="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
      <div class="flex items-center space-x-3 mb-6">
        <div>
          <h2 class="text-xl font-bold">Navigation</h2>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
            v-model="searchString"
            @keyup.enter="searchWithName"
            type="text"
            class="w-full pl-10 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            placeholder="Search for document..."
        />
        <button
            @click="searchWithName"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"></path>
          </svg>
        </button>
      </div>

      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div class="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">

      <!-- Quick Actions -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Shortcut</h3>

        <!-- All Documents -->
        <button
            @click="displayAll"
            class="w-full flex items-center space-x-3 p-3 rounded-xl text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
            📋
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-900 group-hover:text-blue-700">All documents</div>
            <div class="text-sm text-gray-500">Display all</div>
          </div>
          <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Categories -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
          <div class="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
            {{ categories.length }}
          </div>
        </div>

        <!-- Category List -->
        <div class="space-y-2">
          <button
              v-for="category in categories"
              :key="category._id"
              @click="handleCategoryClick(category._id)"
              class="w-full flex items-center space-x-3 p-3 rounded-xl text-left hover:bg-gray-50 hover:shadow-md transition-all duration-200 group border border-transparent hover:border-gray-200"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
              <img
                  :src="'../logo/' + category.name + '.svg'"
                  :alt="category.name"
                  class="w-6 h-6 object-contain"
                  @error="handleImageError"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                {{ category.name }}
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  </aside>

  <!-- Mobile Sidebar Overlay -->
  <div
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 z-50 overflow-hidden"
  >
    <!-- Backdrop -->
    <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        @click="closeMobileSidebar"
    ></div>

    <!-- Mobile Sidebar -->
    <div class="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300">
      <!-- Mobile Header -->
      <div class="relative bg-gradient-to-br from-blue-600 to-purple-700 p-4 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl border border-white/30">
              📚
            </div>
            <div>
              <h2 class="text-lg font-bold">Navigation</h2>
              <p class="text-blue-100 text-xs">Documentation Hub</p>
            </div>
          </div>
          <button
              @click="closeMobileSidebar"
              class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Content (reuse desktop content) -->
      <div class="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
      </div>
    </div>
  </div>
</template>

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
const loading = ref(false)
const showMobileSidebar = ref(false)

const handleCategoryClick = async (categoryId) => {
  loading.value = true
  try {
    if (props.onCategoryClick) {
      await props.onCategoryClick(categoryId)
    }
  } finally {
    loading.value = false
  }
  closeMobileSidebar()
}

const searchWithName = () => {
  if (props.onSearch && searchString.value.trim()) {
    props.onSearch(searchString.value.trim())
    closeMobileSidebar()
  }
}

const displayAll = () => {
  if (props.onDisplayAll) {
    props.onDisplayAll()
  }
  closeMobileSidebar()
}

const closeMobileSidebar = () => {
  showMobileSidebar.value = false
}

const handleImageError = (event) => {
  // Fallback icon if category icon doesn't load
  event.target.style.display = 'none'
  event.target.parentNode.innerHTML = '📁'
}

onMounted(async () => {
  loading.value = true
  try {
    categories.value = await fetchAllCategories()
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Animation for mobile sidebar */
@media (max-width: 1023px) {
  .mobile-sidebar-enter-active,
  .mobile-sidebar-leave-active {
    transition: transform 0.3s ease-out;
  }

  .mobile-sidebar-enter-from,
  .mobile-sidebar-leave-to {
    transform: translateX(-100%);
  }
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}

.group:hover .group-hover\:text-blue-700 {
  color: #1d4ed8;
}

.group:hover .group-hover\:text-green-700 {
  color: #15803d;
}

.group:hover .group-hover\:text-purple-700 {
  color: #7c2d12;
}
</style>