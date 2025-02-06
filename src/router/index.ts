import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/character',
      name: 'character',

      component: () => import('@/views/CharacterView.vue'),
    },
    {
      path: '/location',
      name: 'location',

      component: () => import('@/views/LocationView.vue'),
    },
    {
      path: '/episode',
      name: 'episode',

      component: () => import('@/views/EpisodeView.vue'),
    },
    {
      path: '/character/:id',
      component: () => import('@/views/CharacterDetail.vue'),
    },
    {
      path: '/location/:id',
      component: () => import('@/views/LocationDetail.vue'),
    },
    {
      path: '/episode/:id',
      component: () => import('@/views/EpisodeDetail.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
