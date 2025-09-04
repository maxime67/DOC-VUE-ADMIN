<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section with gradient background -->
    <div class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 2px, transparent 2px); background-size: 50px 50px;"></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            📚 Documentation Hub
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your technical and accessible technical resource center
          </p>
        </div>
      </div>
    </div>

    <div class="flex min-h-screen">
      <!-- Sidebar with modern design -->
      <SidebarComponent
          @categoryClick="handleCategoryClick"
          @search="searchWithName"
          @displayAll="displayAll"
          class="hidden lg:block"
      />

      <!-- Mobile Sidebar Toggle (hidden on desktop) -->
      <div class="lg:hidden fixed top-4 left-4 z-50">
        <button
            @click="toggleMobileSidebar"
            class="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Main Content Area -->
      <main class="flex-1 lg:ml-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="relative w-20 h-20">
              <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>

          <!-- Content Grid -->
          <div v-else>
            <!-- Results Count -->
            <div class="mb-8">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900">
                  Documentation available
                </h2>
                <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {{ results.length }} {{ results.length > 1 ? 'documents' : 'document' }}
                </div>
              </div>
              <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
            </div>

            <!-- Empty State -->
            <div v-if="results.length === 0" class="text-center py-20">
              <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun document trouvé</h3>
              <p class="text-gray-600 max-w-md mx-auto">
                Aucun document ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
              </p>
            </div>

            <!-- Documents Grid -->
            <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div
                  v-for="item in results"
                  :key="item._id"
                  class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <!-- Document Card -->
                <a
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block"
                >
                  <!-- Header with gradient and category icon -->
                  <div class="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
                    <div class="flex items-start justify-between mb-4">
                      <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <img
                            :src="'../logo/' + item.category.name + '.svg'"
                            :alt="item.category.name"
                            class="w-10 h-10 object-contain"
                            @error="handleImageError"
                        />
                      </div>

                      <!-- State badge -->
                      <div class="flex items-center space-x-2">
                        <span
                            :class="[
                            'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                            getStateStyle(item.state)
                          ]"
                        >
                          <div class="w-2 h-2 rounded-full mr-2" :class="getStateDot(item.state)"></div>
                          {{ getStateEmoji(item.state) }} {{ item.state }}
                        </span>
                      </div>
                    </div>

                    <!-- Category tag -->
                    <div class="mb-4">
                      <span class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                        📂 {{ item.category.name }}
                      </span>
                    </div>

                    <!-- Decorative elements -->
                    <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <div class="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {{ item.name }}
                    </h3>

                    <p class="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {{ item.description }}
                    </p>

                    <!-- External link indicator -->
                    <div class="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
                      <span>Ouvrir la documentation</span>
                      <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
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
} from "@/components/utils/DocumentationService.vue"
import SidebarComponent from "@/views/Sidebar.vue";

const categories = ref([])
const selectedSubcategories = ref([])
const loading = ref(false)
const results = ref([])
const showMobileSidebar = ref(false)

const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

// Handle lors de la sélection d'une catégorie
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

const searchWithName = async (searchString) => {
  loading.value = true
  try {
    results.value = await searchByName(searchString)
  } catch (error) {
    console.error('Error fetch documentation by name:', error)
  } finally {
    loading.value = false
  }
}

// Main function, fetchAllDocumentation par défaut
const displayAll = async () => {
  loading.value = true
  try {
    results.value = await fetchAllDocumentation()
  } catch (error) {
    console.error('Error fetch All documentation:', error)
  } finally {
    loading.value = false
  }
};

const getStateStyle = (state) => {
  const styles = {
    'draft': 'bg-yellow-100 text-yellow-800',
    'published': 'bg-green-100 text-green-800',
    'archived': 'bg-gray-100 text-gray-800'
  }
  return styles[state] || 'bg-blue-100 text-blue-800'
}

const getStateDot = (state) => {
  // Manage les couleurs en fonction des états de la documentation, toutes sont publié pour le moment
  const dots = {
    'draft': 'bg-yellow-400',
    'published': 'bg-green-400',
    'archived': 'bg-gray-400'
  }
  return dots[state] || 'bg-blue-400'
}

const getStateEmoji = (state) => {
  // Manage les logo en fonction de l'etat de la documentation
  const emojis = {
    'draft': '📝',
    'published': '📢',
    'archived': '📦'
  }
  return emojis[state] || '📄'
}

const handleImageError = (event) => {
  // Si pas d'image trouvé via le nom de la catégorie, rend une image par défaut
  event.target.style.display = 'none'
  event.target.parentNode.innerHTML = '📁'
}

onMounted(async () => {
  try {
    categories.value = await fetchAllCategories()
    await displayAll()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})
</script>

<style scoped>
/* Animations from portfolio */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Text truncation */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>