import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import User4M from '@/components/User4M.vue'
import Restaurant4M from '@/components/Restaurant4M.vue'
import Restaurant4U from '@/components/Restaurant4U.vue'
import Message from '@/components/Message.vue'
import Order4U from '@/components/Order4U.vue'
import Favorite4U from '@/components/Favorite4U.vue'
import Favorite4R from '@/components/Favorite4R.vue'
import Dish4R from '@/components/Dish4R.vue'
import Order4R from '@/components/Order4R.vue'
import Review4R from '@/components/Review4R.vue'
import Review4U from '@/components/Review4U.vue'
import Dish4U from '@/components/Dish4U.vue'

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
      path: '/manager/user',
      name: '/manager/user',
      meta: {menu: '/manager/user'},
      component: User4M
    },
    {
      path: '/manager/restaurant',
      name: '/manager/restaurant',
      meta: {menu: 'manager/restaurant'},
      component: Restaurant4M
    },
    {
      path: '/user/restaurant',
      name: '/user/restaurant',
      meta: {menu: '/user/restaurant'},
      component: Restaurant4U
    },
    {
      path: '/user/message',
      name: '/user/message',
      meta: {menu: '/user/message'},
      component: Message
    },
    {
      path: '/user/order',
      name: '/user/order',
      meta: {menu: '/user/order'},
      component: Order4U
    },
    {
      path: '/user/favorite',
      name: '/user/favorite',
      meta: {menu: '/user/favorite'},
      component: Favorite4U,
    },
    {
      path: '/user/review',
      name: '/user/review',
      meta: {menu: '/user/review'},
      component: Review4R
    },
    {
      path: '/user/dish',
      name: '/user/dish',
      mate: {menu: '/user/dish'},
      component: Dish4U
    },
    {
      path: '/restaurant/dish',
      name: '/restaurant/dish',
      meta: {menu: '/restaurant/dish'},
      component: Dish4R
    },
    {
      path: '/restaurant/order',
      name: '/restaurant/order',
      meta: {menu: '/restaurant/order'},
      component: Order4R
    },
    {
      path: '/restaurant/review',
      name: '/restaurant/review',
      meta: {menu: '/restaurant/review'},
      component: Review4R
    }
  ]
})

export default router
