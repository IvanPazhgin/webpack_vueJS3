// import Main from '@/pages/Main.vue'
import Main from '../pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // history: createWebHistory(process.env.BASE_URL),
})

export default router
