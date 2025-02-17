import { createRouter, createWebHistory } from 'vue-router'
import TestComponent from "@/components/MainComponent.vue";
import CreateComponent from "@/components/CreateComponent.vue";
import UpdateComponent from "@/components/UpdateComponent.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import ManageCategory from "@/components/ManageCategory.vue";
import UpdateCategory from "@/components/UpdateCategory.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestComponent
    },
    {
      path: '/add/documentation',
      name: 'addDocumentation',
      component: CreateComponent
    },
    {
      path: '/update/documentation/:id',
      name: 'updateDocumentation',
      component: UpdateComponent
    },
    {
      path: '/add/category',
      name: 'createCategory',
      component: CreateCategory
    },
    {
      path: '/manage/category',
      name: 'manageCategory',
      component: ManageCategory
    },
    {
      path: '/update/category/:id',
      name: 'updateCategory',
      component: UpdateCategory
    }
  ]
})

export default router
