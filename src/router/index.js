import { createRouter, createWebHistory } from 'vue-router'
import TestComponent from "@/components/MainComponent.vue";
import ManageCategory from "@/components/Category/ManageCategory.vue";
import Category from "@/components/Category/Category.vue";
import DocumentationComponent from "@/components/Documentation/DocumentationComponent.vue";
import CguView from "@/views/CguView.vue";
import Login from "@/components/Login.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestComponent
    },
    {
      path: '/update/documentation/:id',
      name: 'updateDocumentation',
      component: DocumentationComponent
    },
    {
      path: '/add/documentation',
      name: 'addDocumentation',
      component: DocumentationComponent
    },
    {
      path: '/add/category',
      name: 'createCategory',
      component: Category
    },
    {
      path: '/update/category/:id',
      name: 'updateCategory',
      component: Category
    },
    {
      path: '/manage/category',
      name: 'manageCategory',
      component: ManageCategory
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: CguView
    }
  ]
})

export default router
