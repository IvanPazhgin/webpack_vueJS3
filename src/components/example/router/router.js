// import Main from '@/pages/Main.vue'
import Main from '../pages/Main.vue'
import PostPage from '../pages/PostPage.vue'
import MultiPage from '../pages/MultiPage.vue'
import PostIdPage from '../pages/PostIdPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// https://router.vuejs.org/guide/#javascript

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/multipage',
    component: MultiPage,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
