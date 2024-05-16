import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import User from '../components/User.vue'
import Restaurant from '../components/Restaurant.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {menu: '/'},
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      meta: {menu: '/user'},
      component: User
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      meta: {menu: '/restaurant'},
      component: Restaurant
    }
  ]
})

export default router
