import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/travel',
    name: 'Travel',
    component: () => import('../views/Travel.vue')
  },
  {
    path: '/life',
    name: 'Life',
    component: () => import('../views/Life.vue')
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: () => import('../views/Shopping.vue')
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/Education.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchResults.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/hk-guide/'),
  routes
})

export default router 